///<reference types="chrome"/>

import { StoreService } from "../services/store.service";
import { StoreServiceImplDev } from "../services/store.service.impl.dev";
import { StoreServiceImplProd } from "../services/store.service.impl.prod";


export class EnviromentUtil {

    private static storeServiceInstance : StoreService;

    public static runningAt() : any {
        let getBackgroundPage = chrome?.extension?.getBackgroundPage;
        if (getBackgroundPage){
            return getBackgroundPage() === window ? RuntimeEnviroment.BACKGROUND : RuntimeEnviroment.POPUP;
        }
        return chrome?.runtime?.onMessage ? RuntimeEnviroment.CONTENT : RuntimeEnviroment.WEB;
    }

    public static getStoreService() : StoreService {
        if (this.storeServiceInstance === undefined) {
            this.storeServiceInstance = EnviromentUtil.runningAt() === RuntimeEnviroment.WEB 
                ? new StoreServiceImplDev() 
                : new StoreServiceImplProd()
        }
        return this.storeServiceInstance;
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
    AVAILABLE_ENVIROMENTS = 'availableEnviromets',
    CURRENT_ENVIROMENT = 'currentEnviroment',
    ENVIROMENTS = "enviroments",
}