
importScripts(
    './background/services/httpService.js'
);

function HttpController() {

}

const HTTP_SERVICE = new HttpService();



/**
 *  Used for firing HTTP requests called from QueryService
 *
 *  @param query            - object with data needed to perform http request
 *                            current structure:
 *                            {
 *                              url: string,
 *                              authHeader: string | null
 *                            }
 *  @param responseHandler  - callback that is used to pass the data back to service layer
 */
HttpController.prototype.fetchHttpRequest = function (query, responseCallback) {
    HTTP_SERVICE._fetch(query, responseCallback);
}


HttpController.prototype.openDocumentInNewTab = function(query, responseCallback) {
    HTTP_SERVICE._openDocument(query, responseCallback);
}
