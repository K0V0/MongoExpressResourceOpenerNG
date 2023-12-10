// importScripts(
//   './utils/baseUtil.js',
//   './utils/values.js'
// );

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
  }
}
