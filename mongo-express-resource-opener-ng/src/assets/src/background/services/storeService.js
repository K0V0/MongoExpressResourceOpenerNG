importScripts(
  './utils/baseUtil.js',
  './utils/values.js'
);

function StoreService() {

}

StoreService.prototype.constructor = StoreService;

StoreService.prototype._getFromSyncStore = function(query, responseCallback, withKey, withDefault) {
    this._getFromStore(chrome.storage.sync, query, responseCallback, withKey, withDefault);
}

StoreService.prototype._getFromLocalStore = function(query, responseCallback, withKey, withDefault) {
    this._getFromStore(chrome.storage.local, query, responseCallback, withKey, withDefault);
}

StoreService.prototype._putToLocalStore = function(query, responseCallback) {
    this._putToStore(chrome.storage.local, query, responseCallback);
}

StoreService.prototype._putToSyncStore = function(query, responseCallback) {
    this._putToStore(chrome.storage.sync, query, responseCallback);
}

StoreService.prototype._getFromStores = function(
  query, responseCallback, withKey = false, withDefault = false
) {
  this._getFromStore(chrome.storage.sync, query, resultFromSync => {
    if (!this._isSomethingInStore(resultFromSync)) {
      // not found in sync storage
      // try to search in local storage or default value (if allowed)
      this._getFromStore(chrome.storage.local, query, responseCallback, withKey, withDefault);
    } else {
      // something found in sync storage
      // merge missing settings if multiple of them queried
      let attributesToLoop = [];
      if (query === undefined || query.key === undefined || query.key === null) {
        // want all possible values that application have
        attributesToLoop = Object.values(SETTINGS_NAMES);
      } else if (Array.isArray(query.key)) {
        // want multiple values that are specified in query
        attributesToLoop = query.key;
      }
      let attributesToGetFromLocalStore = attributesToLoop
        .filter(attribute => resultFromSync[attribute] === undefined);
      if (attributesToGetFromLocalStore.length > 0) {
        // merge results from sync and local store
        this._getFromStore(chrome.storage.local, {key: attributesToGetFromLocalStore}, resultFromLocal => {
          responseCallback({ ...resultFromSync, ...resultFromLocal });
        }, withKey, withDefault);
      } else {
        // nothing to merge or single value was successfully queried from sync storage
        responseCallback(resultFromSync);
      }
    }
  }, withKey, false); // disable defaults here otherwise default value can prevail over local store values
}

/**
 * "PRIVATE" methods
 */

StoreService.prototype._getFromStore = function(
  storageType, query, responseCallback, withKey= false, withDefault = false
) {
    const attributes = (query === undefined || query === null) ? null : query.key;
    storageType.get(attributes, result => {
      if (!this._isSomethingInStore(result)) {
        // nothing returned from store, try defaults
        console.log("No data for " + attributes + " in storage found");
        if (Array.isArray(attributes)) {
          // multiple values was queried, return only object with attributes that have some default value
          const response= {};
          attributes
            .filter(attribute => this._getDefault(attribute) !== undefined)
            .forEach(attribute => {
              if (withDefault) {
                response[attribute] = this._getDefault(attribute);
              }
            });
          if (Object.keys(response).length === 0) {
            // nothing found in defaults
            responseCallback(null);
          } else {
            // something found
            responseCallback(response);
          }
        } else {
          // single value queried
          if (withDefault) {
            const response = this._getDefault(attributes);
            if (response !== undefined) {
              // found something in defaults
              withKey ? responseCallback({[attributes]: response}) : responseCallback(response);
            } else {
              // nothing found even in defaults
              responseCallback(null);
            }
          } else {
            // no defaults returning allowed
            responseCallback(null);
          }
        }
      } else {
        // something returned from store
        // - results first
        // - then defaults
        // - if none of above, do not contain attribute in resposne at all
        if (Array.isArray(attributes)) {
          // multiple values queried
          const response = {};
          const resultKeys = Object.keys(result);
          attributes.forEach(attribute => {
            if (resultKeys.includes(attribute)) {
              // push result if found
              response[attribute] = response[attribute];
            } else if (this._getDefault(attribute) !== undefined && withDefault) {
              // if result not found, push default if exists and allowed
              response[attribute] = this._getDefault(attribute);
            }
          });
          if (Object.keys(response).length > 0) {
            // return response
            responseCallback(response);
          } else {
            // return null instead of empty object response
            responseCallback(null);
          }
        } else {
          // single value queried
          responseCallback( withKey ? {[attributes]: result[attributes]} : result[attributes] );
        }
      }
    });
}

StoreService.prototype._putToStore = function(storageType, query, responseCallback) {
    const key = query.key;
    const value = query.value;
    if (key === undefined || value === undefined) {
        console.log('No data passed to storage for ' + key);
    } else {
        storageType
            .set({ [key]: value })
            .then(result => responseCallback(result));
    }
}

StoreService.prototype._getDefault = function(key) {
  if (!Object.values(SETTINGS_NAMES).includes(key)) {
    console.log("No default value for: " + key);
    return undefined;
  }
  return DEFAULTS[key];
}

StoreService.prototype._isSomethingInStore = function(result) {
  return result !== undefined && result !== null && Object.keys(result).length > 0 && result.constructor === Object;
}
