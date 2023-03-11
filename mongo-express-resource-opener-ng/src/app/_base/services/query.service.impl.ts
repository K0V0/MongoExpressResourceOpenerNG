import { Injectable } from "@angular/core";
import { DefaultValues, EnviromentUtil, SettingsNames } from 'src/app/_base/utils/enviroment.util';
import { DataSetsStoreRecordFormat } from '../components/_base/data-sets/data-sets.interfaces';
import { Message, MessageIds } from './../interface/interface';
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


    public open(resourceId : string | undefined) : Promise<void> {
        return new Promise((resolve, reject) => {
            if (resourceId === undefined || resourceId === null || resourceId.trim().length < 1) {
                reject('chýbajúce/nezadané resourceId');
            } else {
                Promise.all([
                    this.loadAllSettings()
                ])
                .then((settings : Settings) => {
                    this.fireRequests(resourceId, settings)
                        .catch((error) => reject(error));
                })
                .catch((error) => reject(error));
            }
        });
    }


    /** HELPING METHODS ------------------------------------------------------------------------------------------- */

    private fireRequests(resourceId : string, settings : Settings) : Promise<void> {
        return new Promise((resolve, reject) => { 

            let datasourcesUrls : string[] = this.getDatasourcesUrls(settings);
            let requestResults : boolean[] = [];

            // firing request directly is not possible - CORS security
            // request must be fired through background script service and communication with this service is only possible
            // using messaging API 
            let requestsPromises : Promise<Response>[] = datasourcesUrls
                .map((url : string) => url + "\"" + resourceId + "\"")
                .map((url : string) => this.sendMessageAsync({ id: MessageIds.HTTP_REQUEST, data: url }))

            Promise.allSettled(requestsPromises)
                .then((responses : PromiseSettledResult<Response>[]) => {
                    responses.map((response : PromiseSettledResult<Response>) => {

                        let responseUrl : string | null = 
                            response.status === 'fulfilled'
                            && response.value !== undefined 
                            && response.value.status === 200 
                            && !datasourcesUrls.includes(this.addLastForwardSlash(response.value.url))  // mongoDB behaviour fix if no document is found
                                ? response.value.url 
                                : null

                        if (responseUrl !== null) {
                            requestResults.push(true);
                            this.openNewTab(responseUrl);
                        } else {
                            requestResults.push(false);
                        }
                    })
                })
                .catch((error) => {
                    console.log(error);
                    reject('Chyba počas spracovávania odpovedí');
                })
                .finally(() => {
                    requestResults.every((value) => value === false) 
                        ? reject('Nenájdený žiaden resource vyhovujúci resourceId') 
                        : resolve();
                });
        });
    }

    private getDatasourcesUrls(settings : Settings) : string[] {

        let searchEverywhere : boolean = this.extractSetting(settings, SettingsNames.CHECK_ON_ALL_ENVIROMENTS);
        let currentEnviroment : number = this.extractSetting(settings, SettingsNames.CURRENT_ENVIROMENT);

        return this.extractSetting(settings, SettingsNames.ENVIROMENTS)
            .filter((enviroment : DataSetsStoreRecordFormat) => searchEverywhere ? true : enviroment.id === currentEnviroment)
            .flatMap((enviroment : DataSetsStoreRecordFormat) => enviroment.datasets)
            .map((datasourceUrl : string) => (datasourceUrl.lastIndexOf("/") === datasourceUrl.length) ? datasourceUrl : datasourceUrl + "/")
    }

    private loadAllSettings() : Promise<Settings> {
        return new Promise((resolve, reject) => {

            let settingsPromises : Promise<KeyValuePair>[] = Object.values(SettingsNames)
                .map((settingName : string) => this.storeService.loadWithKey(settingName));

            Promise.allSettled(settingsPromises)
                .then((results) => resolve(results
                    .map((result : KeyValuePair) => result.status === 'fulfilled' ? result.value : null)
                    .filter((result : KeyValuePair | null) => result !== null)))
                .catch(() => {
                    reject('Chyba pri načítaní nastavení z Chrome store');
                });
        });
    }

    private extractSetting(settings : Settings, settingType : SettingsNames) : any {
        return settings
            .flatMap((setting) => setting)
            .map((setting : KeyValuePair) => Object.keys(setting)[0] === undefined 
                    ? DefaultValues[settingType]
                    : setting[settingType])
            .filter((setting) => setting !== undefined)
            .find((x) => x) 
            ?? DefaultValues[settingType];
    }

    private sendMessageAsync(message : Message, options = {}) : Promise<Response> {
        return new Promise((resolve, reject) => {
            chrome.runtime.sendMessage(message, options, (response : Response) => {
                chrome.runtime.lastError 
                    ? reject(chrome.runtime.lastError)
                    : resolve(response);
            });
        });
    }

    private openNewTab(url : string) {
        chrome.tabs.create({ url: url });
    }

    private addLastForwardSlash(url : string) : string {
        return (url.lastIndexOf('/') == url.length - 1) ? url : url + '/';
    }

}