///<reference types="chrome"/>

import { Injectable } from "@angular/core";

@Injectable({
    providedIn : 'root'
})
export class StoreService {

    constructor() {}

    public load(key : string) : Promise<any> {
        return new Promise((resolve, reject) => {
            chrome.storage.sync.get(key, resolve);
        })
    }

    public save(key : string, content : any) : void {
        console.log('settings save');
        console.log(content);
        if (content === undefined) {
            return;
        }
        chrome.storage.sync.set({ [key]: content });
    }

}