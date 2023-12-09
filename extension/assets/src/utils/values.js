const REQUEST_IDS = {
  HTTP_REQUEST: 1,
  DOCUMENT_FIND: 2,
  STORE_GET_DATA_FROM_ALL_OR_DEFAULTS: 31,
  STORE_GET_DATA_FROM_ALL_WITH_KEYS_OR_DEFAULTS: 81
}

deepFreeze(REQUEST_IDS);

const SETTINGS_NAMES = {
  AUTO_SUBMIT_RESOURCE_ID: 'autoSubmitResourceId',
  CHECK_ON_ALL_ENVIROMENTS: 'checkOnAllEnviroments',
  ERASE_AFTER_FIRED_SUCESSFULLY: 'erasedAfterFiredSucessfully',
  AVAILABLE_ENVIROMENTS: 'availableEnviromets',
  CURRENT_ENVIROMENT: 'currentEnviroment',
  ENVIROMENTS: 'enviroments',
  RESOURCE_ID: 'resourceId',
  SECURE_KEY: 'secureKey',
  STORE_MONGO_LOGIN_CREDENTIALS: 'storeMongoLoginCredentials',
  DOCUMENT_ID_OBJECTS: "documentIdObjects",
  OPEN_REFERENCES_ONECLICK: "openReferencesOneclick"
}

deepFreeze(SETTINGS_NAMES);

const DEFAULTS = {
  [SETTINGS_NAMES.AUTO_SUBMIT_RESOURCE_ID]: false,
  [SETTINGS_NAMES.CHECK_ON_ALL_ENVIROMENTS]: false,
  [SETTINGS_NAMES.AVAILABLE_ENVIROMENTS]: [{
    id: 0,
    name: "Základné prostredie",
    useLogin: false,
    usernameHash: null,
    passHash: null,
    useLoginDefault: false
  }],
  [SETTINGS_NAMES.CURRENT_ENVIROMENT]: 0,
  [SETTINGS_NAMES.ENVIROMENTS]: [{
    id: 0,
    name: "Základné prostredie",
    datasets: [
      "http://example.com/data"
    ]
  }],
  [SETTINGS_NAMES.RESOURCE_ID]: "",
  [SETTINGS_NAMES.ERASE_AFTER_FIRED_SUCESSFULLY]: false,
  [SETTINGS_NAMES.SECURE_KEY]: "MaIFi20NKLhfrRpI",
  [SETTINGS_NAMES.STORE_MONGO_LOGIN_CREDENTIALS]: false,
  [SETTINGS_NAMES.DOCUMENT_ID_OBJECTS]: [
    'resource', 'resourceId', 'formId', 'submissionId', 'createFormId',
    'updateFormId', 'rowDetailFormId', 'defaultViewId'
  ],
  [SETTINGS_NAMES.OPEN_REFERENCES_ONECLICK]: true
};

deepFreeze(DEFAULTS);
