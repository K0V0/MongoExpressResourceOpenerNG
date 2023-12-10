
// importScripts(
//   './utils/baseUtil.js',
//   './utils/values.js'
// );


function DocumentsFindService() {

}

DocumentsFindService.prototype.constructor = DocumentsFindService;



DocumentsFindService.prototype._find = function (resourceId, responseCallback) {
  console.log("documentFindController.find");
  // this._open(resourceId)
  //   .then((resolvedUrls) => responseCallback(resolvedUrls))
  //   .catch((error) => responseCallback(null));
}

/**
 *    "private" methods
 */

DocumentsFindService.prototype._open = function(resourceId) {

  // console.log(resourceId);
  // return new Promise((resolve, reject) => {
  //   if (resourceId === undefined || resourceId === null || resourceId.trim().length < 1) {
  //     reject('chýbajúce/nezadané resourceId');
  //   } else {
  //     Promise.all([
  //       //TODO do not load settings if did not change, develop mechanism to save requests to chrome sync store
  //       // - maybe during any setting update calculate hash for settings and use that
  //       this._loadAllSettings()
  //     ])
  //       .then((settings) => {
  //         console.log("bg service settings");
  //         console.log(settings);
  //         this.fireRequests(resourceId, settings)
  //           .catch((error) => reject(error));
  //       })
  //       .catch((error) => reject(error));
  //   }
  // });
}

DocumentsFindService.prototype._loadAllSettings = function() {

  // const port = chrome.runtime.connect({name: "knockknock"});
  // port.postMessage({ id: REQUEST_IDS.STORE_GET_DATA_FROM_ALL_WITH_KEYS_OR_DEFAULTS, data: null });
  // port.onMessage.addListener(function(msg) {
  //   if (msg.responseId === REQUEST_IDS.STORE_GET_DATA_FROM_ALL_WITH_KEYS_OR_DEFAULTS) {
  //     console.log(msg);
  //   }
  // });

  // console.log("document find load settings");
  // console.log(REQUEST_IDS.STORE_GET_DATA_FROM_ALL_WITH_KEYS_OR_DEFAULTS)
  // sendMessage({ id: REQUEST_IDS.STORE_GET_DATA_FROM_ALL_WITH_KEYS_OR_DEFAULTS, data: {sometinh: "sth"} })
  //   .catch((err) => console.log(err));
  // return sendMessage({ id: REQUEST_IDS.STORE_GET_DATA_FROM_ALL_WITH_KEYS_OR_DEFAULTS, data: {sometinh: "sth"} });
}
