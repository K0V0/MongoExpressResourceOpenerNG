///<reference types="chrome"/>

import { Injectable } from "@angular/core";


@Injectable({
    providedIn : 'root'
})
export class StoreService {

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

    public save(key : string, content : any) : void {
        if (key === undefined || content === undefined) {
            return;
        }
        chrome.storage.sync.set({ [key]: content });
    }

    //TODO do not storing value as undefined => deleted value instead

}