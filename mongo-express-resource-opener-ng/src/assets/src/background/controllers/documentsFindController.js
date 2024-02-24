
importScripts(
  './background/services/documentsFindService.js',
  './background/services/cryptogrService.js'
);

function DocumentsFindController() {}

DocumentsFindController.prototype.constructor = DocumentsFindController;

DocumentsFindController.prototype.DOCUMENTS_FIND_SERVICE =  new DocumentsFindService();



DocumentsFindController.prototype.find = function (data, responseCallback) {
  DocumentsFindController.prototype.DOCUMENTS_FIND_SERVICE._find(data.resourceId, responseCallback);
}
