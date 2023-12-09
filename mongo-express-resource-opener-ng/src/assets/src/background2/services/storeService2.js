// importScripts(
//   './utils/baseUtil.js',
//   './utils/values.js'
// );

function StoreService2() {

}

StoreService2.prototype.constructor = StoreService;

StoreService2.prototype._getFromSyncStore = function(query, withKey, withDefault) {
    return this._getFromStore(chrome.storage.sync, query, withKey, withDefault);
}

StoreService2.prototype._getFromLocalStore = function(query, withKey, withDefault) {
    return this._getFromStore(chrome.storage.local, query, withKey, withDefault);
}

StoreService2.prototype._putToLocalStore = function(query) {
    this._putToStore(chrome.storage.local, query);
}

StoreService2.prototype._putToSyncStore = function(query) {
    this._putToStore(chrome.storage.sync, query);
}

StoreService2.prototype._getFromStore = function(
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
      .then(items => resolve(
        Object.keys(items)
          .map(key => {
            let result = items[key];
            if (result === undefined && withDefault) {
              result = this._getDefault(key);
            }
            if (withKey) {
              result = { [key]: result }
            }
            return result;
          })
        )
      )
      .catch(error => reject(error));
  });
}

StoreService2.prototype._getFromStores = function(query, withKey = false, withDefault = false) {

  return new Promise((resolve, reject) => {
    // local items have highest priority
    // set withDefault to false because it can occupy place for value that can be available in store
    this._getFromStore(chrome.storage.local, query, withKey, false)
      .then(localItems => {
        let result = localItems;
        console.log(localItems);
        const localItemsKeys = Object.keys(localItems);
        this._getFromStore(chrome.storage.sync, query, withKey, withDefault)
          .then(syncItems => {
            Object.keys(syncItems)
              .filter(key => !localItemsKeys.includes(key))
              .forEach(key => {
                let tmpResult = syncItems[key];
                if (tmpResult === undefined && withDefault) {
                  tmpResult = this._getDefault(key);
                }
                if (withKey) {
                  tmpResult = { [key]: tmpResult }
                }
                result[key] = tmpResult;
                console.log(tmpResult);
              })
            resolve(result);
          })
          .catch(error => reject(error));
      })
      .catch(error => reject(error));
  });
}

StoreService2.prototype._putToStore = function(storageType, query, responseCallback) {
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

StoreService2.prototype._getDefault = function(key) {
  if (!Object.values(SETTINGS_NAMES).includes(key)) {
    console.log("No default value for: " + key);
    return undefined;
  }
  return DEFAULTS[key];
}

StoreService2.prototype._isSomethingInStore = function(result) {
  return result !== undefined && result !== null && Object.keys(result).length > 0 && result.constructor === Object;
}
