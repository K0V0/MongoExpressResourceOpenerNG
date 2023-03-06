import { Injectable } from "@angular/core";
import { EnviromentUtil, SettingsNames, DefaultValues } from 'src/app/_base/utils/enviroment.util';
import { DataSetsStoreRecordFormat } from './../components/_base/data-sets/data-sets.interfaces';
import { KeyValuePair, QueryService, Settings } from './query.service';
import { StoreService } from './store.service';


@Injectable({
    providedIn : 'root'
})
export class QueryServiceImpl implements QueryService {

    private storeService : StoreService;
    
    constructor() {
        //FIXME dependency injection on various enviroments
        this.storeService = EnviromentUtil.getStoreService();
    }


    public open(resourceId : string | undefined) : Promise<boolean> {
        var context = this;
        return new Promise((resolve, reject) => {
            if (resourceId === undefined || resourceId === null || resourceId.trim().length < 1) {
                reject(false);
            } else {
                context.check(resourceId)
            }
        });
    }

    /** HELPING METHODS ------------------------------------------------------------------------------------------- */

    private check(resourceId : string) : Promise<any> {
        var context = this;
        return Promise.all([
            context.loadAllSettings()
        ])
        .then((settings : Settings) => {
            context.fireRequests(resourceId, settings)
        });
    }

    private fireRequests(resourceId : string, settings : Settings) : Promise<any> {
        var context = this;
        return new Promise((resolve, reject) => { 

            let requestsPromises : Promise<any>[] = context
                .getDatasourcesUrls(settings, resourceId)
                .map((url) => fetch(url))

            Promise.allSettled(requestsPromises)
                .then((responses) => {
                    console.log('RESPONSE');
                    console.log(responses);
                    //TODO continue 
                    // https://github.com/K0V0/mongoExpressResourceOpener/blob/51896f6e3b8b78b1a9234c58790a93c92f22d74f/js/background_helper.js#L109
                })
        });
    }

    private getDatasourcesUrls(settings : Settings, resourceId : string) : string[] {

        let searchEverywhere : boolean = this.extractSetting(settings, SettingsNames.CHECK_ON_ALL_ENVIROMENTS);
        let currentEnviroment : number = this.extractSetting(settings, SettingsNames.CURRENT_ENVIROMENT);

        return this.extractSetting(settings, SettingsNames.ENVIROMENTS)
                .filter((enviroment : DataSetsStoreRecordFormat) => searchEverywhere ? true : enviroment.id === currentEnviroment)
                .flatMap((enviroment : DataSetsStoreRecordFormat) => enviroment.datasets)
                .map((datasourceUrl : string) => (datasourceUrl.lastIndexOf("/") === datasourceUrl.length) ? datasourceUrl : datasourceUrl + "/")
                .map((datasourceUrl :string) => datasourceUrl + "\"" + resourceId + "\"");
    }

    private loadAllSettings() : Promise<Settings> {
        return new Promise((resolve, reject) => {

            let settingsPromises : Promise<KeyValuePair>[] = [];
            Object.values(SettingsNames).forEach((settingName : string) => {
                settingsPromises.push(this.storeService.loadWithKey(settingName));
            })

            Promise.allSettled(settingsPromises)
                .then((results) => {
                    let settings : Settings = []; 
                    results.forEach((result) => {
                        //TODO really need to be that shitty ? ask stackoverflow why cannot have prettier one liner
                        if (result.status === 'fulfilled') {
                            settings.push(result.value);
                        }
                    });
                    resolve(settings);
                })
                .catch(() => {
                    reject('Error during loading settings from store - promises settling');
                })
        });
    }

    private extractSetting(settings : Settings, settingType : SettingsNames) : any {
        let settingFromStore = settings
            .flatMap((setting) => setting)
            .filter((setting : KeyValuePair) => Object.keys(setting)[0] === undefined 
                    ? DefaultValues[settingType]
                    : settingType)
            .find((x) => x)[settingType];
        console.log(settingFromStore);
        if (settingFromStore === undefined) {
            return DefaultValues[settingType];
        }
        return settingFromStore;
    }

}