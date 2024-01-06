
importScripts(
  './background/controllers/httpController.js',
  './background/controllers/storeController.js',
  './background/controllers/documentsFindController.js'
);

const HTTP_CONTROLLER = new HttpController();
const STORE_CONTROLLER = new StoreController();
const DOCUMENTS_FIND_CONTROLLER = new DocumentsFindController();

//TODO enum with message types is in angular part of app, find the way how to unite this configuration
// problem is that angular app does not know anything about this javascripts and vice versa
const REQUESTS_TABLE = {
  [REQUEST_IDS.HTTP_REQUEST]: HTTP_CONTROLLER.fetchHttpRequest,
  [REQUEST_IDS.DOCUMENT_FIND]: DOCUMENTS_FIND_CONTROLLER.find,
  [REQUEST_IDS.STORE_GET_DATA_FROM_ALL]: STORE_CONTROLLER.getDataFromStores,
  [REQUEST_IDS.STORE_GET_DATA_FROM_ALL_OR_DEFAULTS]: STORE_CONTROLLER.getDataFromStoresWithDefaults,
  [REQUEST_IDS.DOCUMENT_OPEN_NEW_TAB]: HTTP_CONTROLLER.openDocumentInNewTab
  // 4: STORE_CONTROLLER.getDataFromLocalStore,
  // 41: STORE_CONTROLLER.getDataFromLocalStoreWithDefault,
  // 5: STORE_CONTROLLER.getDataFromSyncStore,
  // 51: STORE_CONTROLLER.getDataFromSyncStoreWithDefault,
  // 6: STORE_CONTROLLER.putDataToLocalStore,
  // 7: STORE_CONTROLLER.putDataToSyncStore,
  // 8: STORE_CONTROLLER.getDataFromStoresInEnvelopeWithKey,
  // [REQUEST_IDS.STORE_GET_DATA_FROM_ALL_WITH_KEYS_OR_DEFAULTS]: STORE_CONTROLLER.getDataFromStoresInEnvelopeWithKeyWithDefaults,
  // 9: STORE_CONTROLLER.getDataFromLocalStoreInEnvelopeWithKey,
  // 10: STORE_CONTROLLER.getDataFromSyncStoreInEnvelopeWithKey
}

chrome.runtime.onMessage.addListener(function (message, sender, responseCallback) {
  console.log(message.id);
  console.log(message.data);

  REQUESTS_TABLE[message.id](message.data, responseCallback);
  // true = asynchronous request
  return true;
});
