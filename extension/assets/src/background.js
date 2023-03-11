
var requestIds = {
    httpRequest: 1
}



chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) { 

    switch(request.id) {
        case requestIds.httpRequest:
            httpFunction(request.data, sendResponse);
            break;
    } 

    return true;
});



function httpFunction(url, responseHandler) {
    fetch(url)
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