
//TODO enum with message types is in angular part of app, find the way how to unite this configuration
// problem is that angular app does not know anything about this javascripts and vice versa
var requestIds = {
    httpRequest: 1,
    openLink: 2
}



chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {

  switch(request.id) {
    case requestIds.httpRequest:
      fetchHttpRequest(request.data, sendResponse);
      break;
    case requestIds.openLink:
      openLink(request.data);
      break;
    default:
      console.log('Uncategorized message type: ' + request.id);
      break;
  }

  return true;
});



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
function fetchHttpRequest(query, responseHandler) {

  console.log(query.authHeader);

  const headers = new Headers();
  if (query.authHeader) {
    headers.append('Authorization', 'Basic ' + query.authHeader);
  }

  fetch(query.url, { method: 'GET', headers: headers })
    .then(function(response) {
      responseHandler({
        url: response.url,
        status: response.status
      });
    })
    .catch(function(error) {
      console.log('Connection error');
      console.log(error);
      responseHandler(error);
    });
}


function openLink(resourceId) {

}

