///<reference types="chrome"/>

import { Injectable } from "@angular/core";
import { StoreService } from "./store.service";

/** 
 *  This implementation runs when extension is built and packed
*/

@Injectable({
    providedIn : 'root'
})
export class StoreServiceImplProd implements StoreService {

    constructor() {}

    public load(key : string) : Promise<any> {
        return new Promise((resolve, reject) => {
            chrome.storage.sync.get(key, data => {
                if (Object.keys(data).length === 0 && data.constructor === Object) {
                    reject('No data returned by localStorage');
                } else {
                    resolve(data[key]);
                }
            });
        });
    }

    public loadWithKey(key : string) : Promise<any> {
        var context = this;
        return new Promise((resolve, reject) => {
            this.load(key)
                .then((result : any) => { resolve({ [key]: result }); })
                .catch((reason) => reject(reason));
        });
    }

    public save(key : string, content : any) : Promise<any> {
        return new Promise((resolve, reject) => {
            if (key === undefined || content === undefined) {
                reject('No data passed to localStorage');
            } else {
                chrome.storage.sync
                    .set({ [key]: content })
                    .then((result : any) => { resolve(result); });
            }
        });
    }

}