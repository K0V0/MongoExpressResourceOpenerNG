
importScripts(
  './background/services/documentsFindService.js'
);

function DocumentsFindController() {}

DocumentsFindController.prototype.constructor = DocumentsFindController;

DocumentsFindController.prototype.DOCUMENTS_FIND_SERVICE =  new DocumentsFindService();



DocumentsFindController.prototype.find = function (data, responseCallback) {
  console.log("document.find callss");
  console.log(data);

  DocumentsFindController.prototype.DOCUMENTS_FIND_SERVICE._find(data.resourceId, responseCallback);
}
