function ContentService() {

}

ContentService.prototype = {
  constructor: ContentService,

  getSettings: function() {
    return sendMessage({
      id: 31
    });
  },

  getSetting: function(key) {
    return sendMessage({
      id: 31,
      data: {
        key: key
      }
    });
  }
}
