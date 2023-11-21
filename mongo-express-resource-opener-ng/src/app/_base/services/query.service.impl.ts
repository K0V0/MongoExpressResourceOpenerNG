import {Injectable} from "@angular/core";
import {DefaultValues, EnviromentUtil, SettingsNames} from 'src/app/_base/utils/enviroment.util';
import {DataSetsStoreRecordFormat} from '../components/_base/data-sets/data-sets.interfaces';
import {HttpRequestQuery, MessageIds} from '../interfaces/messaging.interface';
import {KeyValuePair, QueryService, Settings} from './query.service';
import {StoreAllService} from './store-all.service';
import {CryptogrUtil} from "../utils/cryptogr.util";
import {BaseUtil} from "../utils/base.util";


@Injectable({
    providedIn : 'root'
})
export class QueryServiceImpl implements QueryService {

    private storeService : StoreAllService;

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
                    //TODO do not load settings if did not change, develop mechanism to save requests to chrome sync store
                    // - maybe during any setting update calculate hash for settings and use that
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

            let queryMessages : HttpRequestQuery[] = this.buildQueryMessages(settings);
            let datasourcesUrls : string[] = queryMessages.map((queryMessage : HttpRequestQuery) => queryMessage.url);
            let requestResults : boolean[] = [];

            // firing request directly is not possible - CORS security
            // request must be fired through background script service and communication with this service is only possible
            // using messaging API
            let requestsPromises : Promise<Response>[] = queryMessages
                .map((queryMessage : HttpRequestQuery) => {
                  queryMessage.url = queryMessage.url + "\"" + resourceId + "\"";
                  return BaseUtil.sendMessage({ id: MessageIds.HTTP_REQUEST, data: queryMessage })
                });

            Promise.allSettled(requestsPromises)
                .then((responses : PromiseSettledResult<Response>[]) => {
                    responses.map((response : PromiseSettledResult<Response>) => {

                      console.log(response)

                      let mongoDocumentUrl = this.getMongoDocumentUrl(response, datasourcesUrls)
                      let notAuthenticatedUrl = this.isNotAuthenticated(response);

                      if (mongoDocumentUrl) {
                        requestResults.push(true);
                        this.openNewTab(mongoDocumentUrl);
                      } else if (notAuthenticatedUrl) {
                        //TODO nejaky popup, idealne ak su credentials v nastaveniach prostredia moznost ich rovno updatnut o nove
                        // pripadne ulozit a priradit prostrediu
                        reject("Chyba prihlasovacích údajov k MongoExpress pre dané prostredie");
                        requestResults.push(false);
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

    private buildQueryMessages(settings : Settings) : HttpRequestQuery[] {

      let searchEverywhere : boolean = this.extractSetting(settings, SettingsNames.CHECK_ON_ALL_ENVIROMENTS);
      let currentEnviroment : number = this.extractSetting(settings, SettingsNames.CURRENT_ENVIROMENT);
      let secretKey : string = this.extractSetting(settings, SettingsNames.SECURE_KEY);
      let appUsesLogins : boolean = this.extractSetting(settings, SettingsNames.STORE_MONGO_LOGIN_CREDENTIALS);

      return this.extractSetting(settings, SettingsNames.ENVIROMENTS)
        .filter((enviroment : DataSetsStoreRecordFormat) =>
          searchEverywhere ? true : enviroment.id === currentEnviroment)
        .flatMap((enviroment : DataSetsStoreRecordFormat) => {
          let authHeader : string | null = (enviroment.useLogin && appUsesLogins)
            ? this.createBaseAuth64Header(enviroment.usernameHash, enviroment.passHash, secretKey)
            : null;
          let result : HttpRequestQuery[] = enviroment.datasets
            .map((url : string) => {
              return new class implements HttpRequestQuery {
                authHeader: string | null = authHeader;
                url: string = (url.lastIndexOf("/") === url.length) ? url : url + "/";
              }
            });
          return result;
        });
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
                    reject('Chyba pri načítaní nastavení zo store');
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

    private openNewTab(url : string) {
        chrome.tabs.create({ url: url });
    }

    private addLastForwardSlash(url : string) : string {
        return (url.lastIndexOf('/') == url.length - 1) ? url : url + '/';
    }

    private createBaseAuth64Header(hashedUsername : string | null, hashedPassword : string | null, secretKey : string) : string | null {
        console.log(hashedUsername);
        console.log(hashedPassword);
        console.log(secretKey);
      let username : string | null =  CryptogrUtil.decrypt(hashedUsername, secretKey);
      let password : string | null = CryptogrUtil.decrypt(hashedPassword, secretKey);
      console.log(username);
      console.log(password);
      if (!username && !password) {
        return null;
      }
      return btoa(`${username}:${password}`);
    }

    private getMongoDocumentUrl(response : PromiseSettledResult<Response>, datasourcesUrls :  string[]) : string | null {
      return response.status === 'fulfilled'
        && response.value !== undefined
        && response.value.status === 200
        && !datasourcesUrls.includes(this.addLastForwardSlash(response.value.url))  // mongoDB behaviour fix if no document is found
          ? response.value.url
          : null
    }

    private isNotAuthenticated(response : PromiseSettledResult<Response>) : string | null {
      //TODO
      return null;
    }

}
