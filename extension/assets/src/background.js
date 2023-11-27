
importScripts(
    './background/controllers/httpController.js',
    './background/controllers/storeController.js'
);

const HTTP_CONTROLLER = new HttpController();
const STORE_CONTROLLER = new StoreController();

//TODO enum with message types is in angular part of app, find the way how to unite this configuration
// problem is that angular app does not know anything about this javascripts and vice versa
const REQUESTS_TABLE = {
  1: HTTP_CONTROLLER.fetchHttpRequest,
  2: HTTP_CONTROLLER.openDocumentInNewTab,
  3: STORE_CONTROLLER.getDataFromStores,
  31: STORE_CONTROLLER.getDataFromStoresWithDefaults,
  4: STORE_CONTROLLER.getDataFromLocalStore,
  41: STORE_CONTROLLER.getDataFromLocalStoreWithDefault,
  5: STORE_CONTROLLER.getDataFromSyncStore,
  51: STORE_CONTROLLER.getDataFromSyncStoreWithDefault,
  6: STORE_CONTROLLER.putDataToLocalStore,
  7: STORE_CONTROLLER.putDataToSyncStore,
  8: STORE_CONTROLLER.getDataFromStoresInEnvelopeWithKey,
  81: STORE_CONTROLLER.getDataFromStoresInEnvelopeWithKeyWithDefaults,
  9: STORE_CONTROLLER.getDataFromLocalStoreInEnvelopeWithKey,
  10: STORE_CONTROLLER.getDataFromSyncStoreInEnvelopeWithKey
}

chrome.runtime.onMessage.addListener(function (message, sender, responseCallback) {
  REQUESTS_TABLE[message.id](message.data, responseCallback);
  return true;
});



