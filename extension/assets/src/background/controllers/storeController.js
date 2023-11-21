
importScripts(
    './background/services/storeService.js'
);

function StoreController() {

}

const STORE_SERVICE = new StoreService();



StoreController.prototype.getDataFromStores = function(data, responseCallback) {

}

StoreController.prototype.getDataFromLocalStore = function(data, responseCallback) {
    STORE_SERVICE._getFromLocalStore(data, responseCallback);
}

StoreController.prototype.getDataFromSyncStore = function(data, responseCallback) {
    STORE_SERVICE._getFromSyncStore(data, responseCallback);
}

StoreController.prototype.putDataToLocalStore = function(data, responseCallback) {
    STORE_SERVICE._putToLocalStore(data, responseCallback);
}

StoreController.prototype.putDataToSyncStore = function(data, responseCallback) {
    STORE_SERVICE._putToSyncStore(data, responseCallback);
}

StoreController.prototype.getDataFromStoresInEnvelopeWithKey = function(data, responseCallback) {

}

StoreController.prototype.getDataFromLocalStoreInEnvelopeWithKey = function(data, responseCallback) {
    STORE_SERVICE._getFromLocalStore(data, responseCallback, true);
}

StoreController.prototype.getDataFromSyncStoreInEnvelopeWithKey = function(data, responseCallback) {
    STORE_SERVICE._getFromSyncStore(data, responseCallback, true);
}



