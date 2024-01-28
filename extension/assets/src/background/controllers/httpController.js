
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
 *  @param responseCallback - callback that is used to pass the data back to service layer
 */
HttpController.prototype.fetchHttpRequest = function (query, responseCallback) {
    HTTP_SERVICE._fetch(query, responseCallback);
}

/**
 *  Used to open given URL in new tab
 *
 *  @param query            - object witl array of URLs to open in new tab(s)
 *                            {
 *                              url: string[]
 *                            }
 *  @param responseCallback - not applied yet
 */
HttpController.prototype.openDocumentInNewTab = function(query, responseCallback) {
    HTTP_SERVICE._openDocument(query.url, responseCallback);
}
