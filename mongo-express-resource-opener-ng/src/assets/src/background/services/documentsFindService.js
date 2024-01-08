
function DocumentsFindService() {

}

DocumentsFindService.prototype.constructor = DocumentsFindService;

DocumentsFindService.prototype.STORE_SERVICE = new StoreService();
DocumentsFindService.prototype.HTTP_SERVICE = new HttpService();



DocumentsFindService.prototype._find = function (resourceId, responseCallback) {
  DocumentsFindService.prototype.STORE_SERVICE._getFromStores(null, false, true)
    .then(resolve => {
      // loaded ALL settings and pass to next stage
      return this._fireRequests(resourceId, resolve)
    })
    .then(resolve => {
      responseCallback(resolve);
    })
    .catch(reject => {
      //TODO i18n
      console.log("Chyba pri odosielaní výsledkov");
      console.log(reject);
      responseCallback(getMessageResponseObject(false, []));
    });
}



/**
 *    "private" methods
 */

DocumentsFindService.prototype._fireRequests = function(resourceId, settings) {
  return new Promise((resolve, reject) => {
    const dataSets = this._buildDataSetsToQuery(settings);
    const dataSetsUrls = dataSets.map(dataSet => dataSet.url);
    const queries =  this._buildDocumentsToQuery(dataSets, resourceId)
    const promises = this._queryEndpoints(queries);

    const requestSucessStates = [];
    const foundDocuments = [];

    Promise.allSettled(promises)
      .then(responses => {
        responses.forEach(response => {
          const mongoDocumentUrl = this._getUrlIfIsMongoDocument(response, dataSetsUrls);
          const notAuthenticatedUrl =  this._getUrlIfIsUnauthenticated(response);

          if (mongoDocumentUrl) {
            requestSucessStates.push(true);
            foundDocuments.push(mongoDocumentUrl);
          } else if (notAuthenticatedUrl) {
            //TODO nejaky popup, idealne ak su credentials v nastaveniach prostredia moznost ich rovno updatnut o nove
            // pripadne ulozit a priradit prostrediu
            //TODO i18n
            reject("Chyba prihlasovacích údajov k MongoExpress pre dané prostredie");
            requestSucessStates.push(false);
          } else {
            requestSucessStates.push(false);
          }
        });

      })
      .catch(error => {
        //TODO i18n
        reject('Chyba počas spracovávania odpovedí');
        console.log(error);
      })
      .finally(() => {
        //TODO i18n
        requestSucessStates.every((value) => value === false)
          ? reject(getMessageResponseObject(false, 'Nenájdený žiaden resource vyhovujúci resourceId'))
          : resolve(getMessageResponseObject(true, foundDocuments));
      })
  })
}

/**
 *  collects URLs of data sets for all relevant enviroments
 *  attach auth header if target enviroment requires login
 *
 *  [
 *    { autHeader: <header> | null, url: <url_env1_set1> },
 *    ...
 *  ]
 */
DocumentsFindService.prototype._buildDataSetsToQuery = function(settings) {

  // extract required settings
  let searchEverywhere = this.extractSetting(settings, SETTINGS_NAMES.CHECK_ON_ALL_ENVIROMENTS);
  let currentEnviroment = this.extractSetting(settings, SETTINGS_NAMES.CURRENT_ENVIROMENT);
  let secretKey = this.extractSetting(settings, SETTINGS_NAMES.SECURE_KEY);
  let appUsesLogins = this.extractSetting(settings, SETTINGS_NAMES.STORE_MONGO_LOGIN_CREDENTIALS);

  // filter relevant enviroments and its data sets to extract relevant urls to data sets
  // attach auth header if given enviroment uses login and login feature is enabled in app
  return this.extractSetting(settings, SETTINGS_NAMES.ENVIROMENTS)
    .filter((enviroment) =>
      searchEverywhere ? true : enviroment.id === currentEnviroment)
    .flatMap((enviroment) => {
      const authHeader = (enviroment.useLogin && appUsesLogins)
        ? this._createBaseAuth64Header(enviroment.usernameHash, enviroment.passHash, secretKey)
        : null;
      return enviroment.datasets
        .map((datasetUrl) => {
          return {
            authHeader: authHeader,
            url: (datasetUrl.lastIndexOf("/") === datasetUrl.length) ? datasetUrl : datasetUrl + "/"
          }
        });
    });
}

/**
 *  adds queried resource ID to each dataSet URL
 */
DocumentsFindService.prototype._buildDocumentsToQuery = function (dataSets, resourceId) {
  return dataSets
    .map(dataSet => {
      return {
        url: dataSet.url + "\"" + resourceId + "\"",
        authHeader: dataSet.authHeader
      }
    });
}

/**
 *  sends HTTP request(s) to given set of URLs
 */
DocumentsFindService.prototype._queryEndpoints = function(queries) {
  return queries.map(query => DocumentsFindService.prototype.HTTP_SERVICE._fetchWithPromise(query));
}

/**
 *    Should return single value corresponded to given setting
 */
DocumentsFindService.prototype.extractSetting = function(settings, settingType) {
  //TODO !!!! default settings should now be loaded from storage if not alternative is available
  //TODO check current API
  let result = settings[settingType];
  // try to obtain setting
  if (result === undefined || result === null) {
    result = DEFAULTS[settingType];
  }
  // value did not exists
  if (result === undefined || result === null) {
    // kurva do piči čo
  }
  return result;
}

DocumentsFindService.prototype._createBaseAuth64Header = function(hashedUsername, hashedPassword, secretKey) {
  //TODO moved to service
  let username =  CryptogrUtil.decrypt(hashedUsername, secretKey);
  let password = CryptogrUtil.decrypt(hashedPassword, secretKey);
  if (!username && !password) {
    return null;
  }
  return btoa(`${username}:${password}`);
}

DocumentsFindService.prototype._getUrlIfIsMongoDocument = function(response, datasetsUrls) {
  return response.status === 'fulfilled'
    && response.value !== undefined
    && response.value.status === 200
    && !datasetsUrls.includes(this.addLastForwardSlash(response.value.url))  // mongoDB behaviour fix if no document is found
      ? response.value.url
      : null
}

DocumentsFindService.prototype._getUrlIfIsUnauthenticated = function(response) {
  //TODO implement
  return null;
}

DocumentsFindService.prototype.addLastForwardSlash = function(url) {
  return (url.lastIndexOf('/') === url.length - 1) ? url : url + '/';
}
