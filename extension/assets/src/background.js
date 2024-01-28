
importScripts(
  './background/controllers/httpController.js',
  './background/controllers/storeController.js',
  './background/controllers/documentsFindController.js',
  './background/controllers/cryptogrController.js'
);

const HTTP_CONTROLLER = new HttpController();
const STORE_CONTROLLER = new StoreController();
const DOCUMENTS_FIND_CONTROLLER = new DocumentsFindController();
const CRYPTOGR_CONTROLLER = new CryptogrController();

const REQUESTS_TABLE = {
  [REQUEST_IDS.HTTP_REQUEST]: HTTP_CONTROLLER.fetchHttpRequest,
  [REQUEST_IDS.DOCUMENT_FIND]: DOCUMENTS_FIND_CONTROLLER.find,
  [REQUEST_IDS.STORE_GET_DATA_FROM_ALL]: STORE_CONTROLLER.getDataFromStores,
  [REQUEST_IDS.STORE_GET_DATA_FROM_ALL_OR_DEFAULTS]: STORE_CONTROLLER.getDataFromStoresWithDefaults,
  [REQUEST_IDS.DOCUMENT_OPEN_NEW_TAB]: HTTP_CONTROLLER.openDocumentInNewTab,
  [REQUEST_IDS.STORE_GET_DATA_FROM_LOCAL_OR_DEFAULTS]: STORE_CONTROLLER.getDataFromLocalStoreWithDefault,
  [REQUEST_IDS.STORE_GET_DATA_FROM_SYNC_OR_DEFAULTS]: STORE_CONTROLLER.getDataFromSyncStoreWithDefault,
  [REQUEST_IDS.STORE_PUT_DATA_TO_LOCAL]: STORE_CONTROLLER.putDataToLocalStore,
  [REQUEST_IDS.STORE_PUT_DATA_TO_SYNC]: STORE_CONTROLLER.putDataToSyncStore,
  [REQUEST_IDS.CRYPTO_GENERATE_HASH]: CRYPTOGR_CONTROLLER.generateHash,
  [REQUEST_IDS.CRYPTO_ENCRYPT]: CRYPTOGR_CONTROLLER.encrypt,
  [REQUEST_IDS.CRYPTO_DECRYPT]: CRYPTOGR_CONTROLLER.decrypt
}

chrome.runtime.onMessage.addListener(function (message, sender, responseCallback) {
  logger(
    "Message ID: {}, message action: {}, message Data: {}",
    message.id, getKeyByValue(REQUEST_IDS, message.id), message.data);

  REQUESTS_TABLE[message.id](message.data, responseCallback);
  // true = asynchronous request
  return true;
});
