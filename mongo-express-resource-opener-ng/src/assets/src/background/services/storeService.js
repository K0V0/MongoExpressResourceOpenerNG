function StoreService() {

}



StoreService.prototype._getFromSyncStore = function(query, responseCallback, withKey) {
    this._getFromStore(chrome.storage.sync, query, responseCallback, withKey);
}

StoreService.prototype._getFromLocalStore = function(query, responseCallback, withKey) {
    this._getFromStore(chrome.storage.local, query, responseCallback, withKey);
}

StoreService.prototype._putToLocalStore = function(query, responseCallback) {
    this._putToStore(chrome.storage.local, query, responseCallback);
}

StoreService.prototype._putToSyncStore = function(query, responseCallback) {
    this._putToStore(chrome.storage.sync, query, responseCallback);
}

StoreService.prototype._getFromStore = function(storageType, query, responseCallback, withKey=false) {
    const key = query.key;
    storageType.get(key, data =>
        Object.keys(data).length === 0 && data.constructor === Object
            ? console.log("No data for " + key + " in storage found")
            : withKey ? responseCallback( {[key]: data[key]} ) : responseCallback( data[key] ));
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
