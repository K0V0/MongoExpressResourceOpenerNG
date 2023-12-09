
importScripts(
    './background/services/storeService.js'
);

function StoreController() {

}

const STORE_SERVICE = new StoreService();


/**
 *  - get data from Sync store
 *  - if not, try to get from local store
 */
StoreController.prototype.getDataFromStores = function(data, responseCallback) {
  STORE_SERVICE._getFromAllStores(data, false, false, responseCallback);
}

/**
 *  - get data from Sync store
 *  - if not, try to get from local store
 *  - if not even there, use default
 */
StoreController.prototype.getDataFromStoresWithDefaults = function(data, responseCallback) {
  STORE_SERVICE._getFromAllStores(data, false, true, responseCallback);
}


// StoreController.prototype.getDataFromLocalStore = function(data, responseCallback) {
//     STORE_SERVICE._getFromLocalStore(data, responseCallback);
// }
//
// StoreController.prototype.getDataFromLocalStoreWithDefault = function(data, responseCallback) {
//   STORE_SERVICE._getFromLocalStore(data, responseCallback, false, true);
// }
//
//
// StoreController.prototype.getDataFromSyncStore = function(data, responseCallback) {
//     STORE_SERVICE._getFromSyncStore(data, responseCallback);
// }
//
// StoreController.prototype.getDataFromSyncStoreWithDefault = function(data, responseCallback) {
//   STORE_SERVICE._getFromSyncStore(data, responseCallback, false, true);
// }
//
//
// StoreController.prototype.putDataToLocalStore = function(data, responseCallback) {
//     STORE_SERVICE._putToLocalStore(data, responseCallback);
// }
//
// StoreController.prototype.putDataToSyncStore = function(data, responseCallback) {
//     STORE_SERVICE._putToSyncStore(data, responseCallback);
// }
//
//
// StoreController.prototype.getDataFromStoresInEnvelopeWithKey = function(data, responseCallback) {
//   STORE_SERVICE._getFromAllStores(data, responseCallback, true);
// }
//
// StoreController.prototype.getDataFromStoresInEnvelopeWithKeyWithDefaults = function(data, responseCallback) {
//   STORE_SERVICE._getFromAllStores(data, responseCallback, true, true);
// }
//
//
// StoreController.prototype.getDataFromLocalStoreInEnvelopeWithKey = function(data, responseCallback) {
//     STORE_SERVICE._getFromLocalStore(data, responseCallback, true);
// }
//
// StoreController.prototype.getDataFromSyncStoreInEnvelopeWithKey = function(data, responseCallback) {
//     STORE_SERVICE._getFromSyncStore(data, responseCallback, true);
// }



