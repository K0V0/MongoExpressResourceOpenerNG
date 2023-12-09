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

StoreService.prototype._getFromAllStores = function(
  query, withKey = false, withDefault = false, responseCallback
) {
  this._getFromStores(query, withKey, withDefault)
    .then(resolve => responseCallback(resolve))
    .catch(error => console.log(error));
}

/**
 *    "PRIVATE" methods
 */

StoreService.prototype._getFromStore = function(
  storageType, attribute, withKey = false, withDefault = false
) {
  return new Promise((resolve, reject) => {
    const attributesToQuery = [];
    if (attribute === undefined || attribute === null || attribute.key === null || attribute.key === undefined) {
      // return all possible results
      attributesToQuery.push(...Object.values(SETTINGS_NAMES));
    } else if (Array.isArray(attribute)) {
      // multiple values queried
      attributesToQuery.push(...attribute);
    } else {
      // single value queried
      attributesToQuery.push(attribute);
    }
    storageType
      .get(attributesToQuery)
      .then(items => {
        const result = {};
        attributesToQuery.forEach(attr => {
          result[attr] = this._getValue(items, attr, withKey, withDefault)
        });
        resolve(result)
      })
      .catch(error => reject(error));
  });
}

StoreService.prototype._getFromStores = function(query, withKey = false, withDefault = false) {

  return new Promise((resolve, reject) => {
    // local items have highest priority
    // set withDefault to false because it can occupy place for value that can be available in store
    let result = {};
    this._getFromStore(chrome.storage.local, query, withKey, false)
      .then(localItems => {
        result = localItems;
        return this._getFromStore(chrome.storage.sync, query, withKey, withDefault);
      })
      .then(syncItems => {
        const localItemsKeys = Object.keys(result);
        Object.keys(syncItems)
          .filter(key => !localItemsKeys.includes(key) || result[key] === undefined)
          .forEach(key => {
            result[key] = this._getValue(syncItems, key, withKey, withDefault);
          })
        resolve(result);
      })
      .catch(error => reject(error));
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

/**
 *    "HELPER" methods
 */

StoreService.prototype._getDefaultValue = function(key) {
  if (!Object.values(SETTINGS_NAMES).includes(key)) {
    return undefined;
  }
  return DEFAULTS[key];
}

StoreService.prototype._getValue = function(items, key, withKey, withDefault) {
  let result = items[key];
  if (result === undefined && withDefault) {
    result = this._getDefaultValue(key);
  }
  if (withKey) {
    result = { [key]: result }
  }
  return result;
}
