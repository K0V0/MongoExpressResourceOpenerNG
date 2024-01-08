function HttpService() {

}



HttpService.prototype._fetch = function (query, responseCallback) {

    const headers = new Headers();
    if (query.authHeader) {
        headers.append('Authorization', 'Basic ' + query.authHeader);
    }

    fetch(query.url, { method: 'GET', headers: headers })
        .then(function(response) {
            responseCallback({
                url: response.url,
                status: response.status
            });
        })
        .catch(function(error) {
            console.log('Connection error');
            console.log(error);
            responseCallback(error);
        });
}

HttpService.prototype._fetchWithPromise = function (query) {

  const headers = new Headers();
  if (query.authHeader) {
    headers.append('Authorization', 'Basic ' + query.authHeader);
  }

  return fetch(query.url, { method: 'GET', headers: headers });
}

HttpService.prototype._openDocument = function(query, responseCallback) {
  query.forEach(url => chrome.tabs.create({ url: url }));
}
