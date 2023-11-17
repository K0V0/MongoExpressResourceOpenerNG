///<reference types="chrome"/>

import { StoreService } from "../services/store.service";
import { StoreSyncServiceImplDev } from "../services/store-sync.service.impl.dev";
import { StoreSyncServiceImplProd } from "../services/store-sync.service.impl.prod";
import { BaseUtil } from "./base.util";
import {StoreLocalServiceImpl} from "../services/store-local.service.impl";
import {StoreServiceImpl} from "../services/store.service.impl";


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

    public static getStoreSyncService() : StoreService {
        if (this.storeSyncServiceInstance === undefined) {
            this.storeSyncServiceInstance = EnviromentUtil.runningAt() === RuntimeEnviroment.WEB
                ? new StoreSyncServiceImplDev()
                : new StoreSyncServiceImplProd()
        }
        return this.storeSyncServiceInstance;
    }

    public static getStoreLocalService() : StoreService {
      if (this.storeLocalServiceInstance === undefined) {
        this.storeLocalServiceInstance = new StoreLocalServiceImpl();
      }
      return this.storeLocalServiceInstance;
    }

    public static getStoreService() : StoreService {
      if (this.storeServiceInstance === undefined) {
        this.storeServiceInstance = new StoreServiceImpl(this.getStoreLocalService(), this.getStoreSyncService());
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


export enum SettingsNames {
    AUTO_SUBMIT_RESOURCE_ID = 'autoSubmitResourceId',
    CHECK_ON_ALL_ENVIROMENTS = 'checkOnAllEnviroments',
    ERASE_AFTER_FIRED_SUCESSFULLY = 'erasedAfterFiredSucessfully',
    AVAILABLE_ENVIROMENTS = 'availableEnviromets',
    CURRENT_ENVIROMENT = 'currentEnviroment',
    ENVIROMENTS = 'enviroments',
    RESOURCE_ID = 'resourceId',
    SECURE_KEY = 'secureKey',
    STORE_MONGO_LOGIN_CREDENTIALS = 'storeMongoLoginCredentials'
}


export const DefaultValues: any = {
  [SettingsNames.AUTO_SUBMIT_RESOURCE_ID]: false,
  [SettingsNames.CHECK_ON_ALL_ENVIROMENTS]: false,
  [SettingsNames.AVAILABLE_ENVIROMENTS]: [{
    id: 0,
    name: "Základné prostredie",
    useLogin: false,
    usernameHash: null,
    passHash: null
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
  [SettingsNames.SECURE_KEY]: null,
  [SettingsNames.STORE_MONGO_LOGIN_CREDENTIALS]: false
};

BaseUtil.deepFreeze(DefaultValues);
