import { EnviromentUtil } from 'src/app/_base/utils/enviroment.util';
import { StoreService } from './store.service';
import { SettingsNames } from './../utils/enviroment.util';
import { QueryService } from './query.service';
import { Injectable } from "@angular/core";

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


    private check(resourceId : string) : Promise<any> {
        var context = this;
        // return new Promise((resolve, reject) => {

        // });
        return Promise.all([
            context.loadAllSettings()
        ])
        .then((settings : any) => {
            //console.log('all settings resolved promises loaded');
            //console.log(result);
            
        });
    }

    private fireRequests() : Promise<any> {
        return new Promise((resolve, reject) => { 
            
        });
    }

    private loadAllSettings() : Promise<any> {
        return new Promise((resolve, reject) => {

            let settingsPromises : Promise<any>[] = [];
            Object.values(SettingsNames).forEach((settingName : string) => {
                settingsPromises.push(this.storeService.loadWithKey(settingName));
            })

            Promise.allSettled(settingsPromises).then((results) => {
                // console.log('all settings promises settled');
                //console.log(results);
                // let settings : any = results
                //     .filter((result) => result.status === 'fulfilled')
                //     .map((result) => result.value);
                let settings : any[] = []; 
                results.forEach((result) => {
                    // console.log(result.status);
                    if (result.status === 'fulfilled') {
                        // console.log(result.value);
                        settings.push(result.value);
                    }
                });

                resolve(settings);
            }).catch(() => {
                reject('Error during loading settings from store - promises settling');
            })

        });
    }

}