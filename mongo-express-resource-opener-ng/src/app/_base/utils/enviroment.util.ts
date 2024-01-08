///<reference types="chrome"/>

import {StoreAllService} from "../services/store-all.service";
import {StoreSyncServiceImplDev} from "../services/store-sync.service.impl.dev";
import {StoreSyncServiceImplProd} from "../services/store-sync.service.impl.prod";
import {BaseUtil} from "./base.util";
import {StoreLocalServiceImpl} from "../services/store-local.service.impl";
import {StoreAllServiceImpl} from "../services/store-all.service.impl";
import {StoreService} from "../services/store.service";


export class EnviromentUtil {

    private static storeSyncServiceInstance : StoreService;
    private static storeLocalServiceInstance : StoreService;
    private static storeServiceInstance : StoreService;

    public static runningAt() : any {
        let getBackgroundPage = chrome?.extension?.getBackgroundPage;
        if (getBackgroundPage){
            return getBackgroundPage() === window ? RuntimeEnviroment.BACKGROUND : RuntimeEnviroment.POPUP;
        }
        return chrome?.runtime?.onMessage ? RuntimeEnviroment.CONTENT : RuntimeEnviroment.WEB;
    }

    public static getStoreSyncService() : StoreAllService {
        if (this.storeSyncServiceInstance === undefined) {
            // this.storeSyncServiceInstance = EnviromentUtil.runningAt() === RuntimeEnviroment.WEB
            //     ? new StoreSyncServiceImplDev()
            //     : new StoreSyncServiceImplProd()
          this.storeSyncServiceInstance = new StoreSyncServiceImplProd();
        }
        return this.storeSyncServiceInstance;
    }

    public static getStoreLocalService() : StoreAllService {
      if (this.storeLocalServiceInstance === undefined) {
        this.storeLocalServiceInstance = new StoreLocalServiceImpl();
      }
      return this.storeLocalServiceInstance;
    }

    public static getStoreService() : StoreAllService {
      if (this.storeServiceInstance === undefined) {
       // this.storeServiceInstance = new StoreAllServiceImpl(this.getStoreLocalService(), this.getStoreSyncService());
        this.storeServiceInstance = new StoreAllServiceImpl();
      }
      return this.storeServiceInstance;
    }

    public static getDefaultSetting(setting : SettingsNames) : any {
        return DefaultValues[setting];
    }

}


export enum RuntimeEnviroment {
    BACKGROUND,
    POPUP,
    CONTENT,
    WEB
}


//TODO make somehow visible for both angular and JS part of app
export enum SettingsNames {
    AUTO_SUBMIT_RESOURCE_ID = 'autoSubmitResourceId',
    CHECK_ON_ALL_ENVIROMENTS = 'checkOnAllEnviroments',
    ERASE_AFTER_FIRED_SUCESSFULLY = 'erasedAfterFiredSucessfully',
    AVAILABLE_ENVIROMENTS = 'availableEnviromets',
    CURRENT_ENVIROMENT = 'currentEnviroment',
    ENVIROMENTS = 'enviroments',
    RESOURCE_ID = 'resourceId',
    SECURE_KEY = 'secureKey',
    STORE_MONGO_LOGIN_CREDENTIALS = 'storeMongoLoginCredentials',
    DOCUMENT_ID_OBJECTS = "documentIdObjects",
    OPEN_REFERENCES_ONECLICK = "openReferencesOneclick"
}

//TODO make somehow visible for both angular and JS part of app
//TODO unite with interfaces
export const DefaultValues: any = {
  [SettingsNames.AUTO_SUBMIT_RESOURCE_ID]: false,
  [SettingsNames.CHECK_ON_ALL_ENVIROMENTS]: false,
  [SettingsNames.AVAILABLE_ENVIROMENTS]: [{
    id: 0,
    name: "Základné prostredie",
    useLogin: false,
    usernameHash: null,
    passHash: null,
    useLoginDefault: false
  }],
  [SettingsNames.CURRENT_ENVIROMENT]: 0,
  [SettingsNames.ENVIROMENTS]: [{
    id: 0,
    name: "Základné prostredie",
    datasets: [
      "http://example.com/data"
    ]
  }],
  [SettingsNames.RESOURCE_ID]: "",
  [SettingsNames.ERASE_AFTER_FIRED_SUCESSFULLY]: false,
  [SettingsNames.SECURE_KEY]: "MaIFi20NKLhfrRpI",
  [SettingsNames.STORE_MONGO_LOGIN_CREDENTIALS]: false,
  [SettingsNames.DOCUMENT_ID_OBJECTS]: [
    'resource', 'resourceId', 'formId', 'submissionId', 'createFormId',
    'updateFormId', 'rowDetailFormId', 'defaultViewId'
  ],
  [SettingsNames.OPEN_REFERENCES_ONECLICK]: true
};

BaseUtil.deepFreeze(DefaultValues);
