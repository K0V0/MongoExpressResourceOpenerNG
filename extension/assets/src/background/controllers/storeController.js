
importScripts(
    './background/services/storeService.js'
);

function StoreController() {}

StoreController.prototype.constructor = StoreController;

StoreController.prototype.STORE_SERVICE = new StoreService();

/**
 *  - try to get data from stores, data from local store have precednce
 *  - do not use defaults
 */
StoreController.prototype.getDataFromStores = (data, responseCallback) =>
  StoreController.prototype.STORE_SERVICE._getFromAllStores(data, false, false, responseCallback);

/**
 *  - get available data from local store and prioritize them
 *  - then try use synchronized store
 *  - iv everything fails, try to set defaults
 */
StoreController.prototype.getDataFromStoresWithDefaults = (data, responseCallback) =>
  StoreController.prototype.STORE_SERVICE._getFromAllStores(data, false, true, responseCallback);



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



