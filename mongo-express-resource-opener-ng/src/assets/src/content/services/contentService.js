
function ContentService() {

}

ContentService.prototype = {
  constructor: ContentService,

  getSettings: function() {
    return sendMessage({
      id: REQUEST_IDS.STORE_GET_DATA_FROM_ALL_OR_DEFAULTS
    });
  },

  getSetting: function(data) {
    return sendMessage({
      id: REQUEST_IDS.STORE_GET_DATA_FROM_ALL_OR_DEFAULTS,
      data: data
    });
  },

  openInNewTab: function (resourceId) {
    // send message to background script to fetch document
    sendMessage({ id: REQUEST_IDS.DOCUMENT_FIND, data: { resourceId: resourceId } })
      .then((resolve) => {
        // success, send the message to background script to open tab(s)
        sendMessage({ id: REQUEST_IDS.DOCUMENT_OPEN_NEW_TAB, data: resolve.data });
      })
      .catch((error) => console.log(error));
  }
}
