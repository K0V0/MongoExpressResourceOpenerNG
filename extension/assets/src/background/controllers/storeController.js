
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

StoreController.prototype.getDataFromLocalStoreWithDefault = (data, responseCallback) =>
  StoreController.prototype.STORE_SERVICE._getFromLocalStore(data, responseCallback, false, true);

StoreController.prototype.getDataFromSyncStoreWithDefault = (data, responseCallback) =>
  StoreController.prototype.STORE_SERVICE._getFromSyncStore(data, responseCallback, false, true);

StoreController.prototype.putDataToLocalStore = (data, responseCallback) =>
  StoreController.prototype.STORE_SERVICE._putToLocalStore(data, responseCallback);

StoreController.prototype.putDataToSyncStore = (data, responseCallback) =>
  StoreController.prototype.STORE_SERVICE._putToSyncStore(data, responseCallback);



