///<reference types="chrome"/>

import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class StoreService {

    public load(key : string) : Promise<any> {
        return new Promise((resolve, reject) => {
            chrome.storage.sync.get(key, resolve);
        })
    }

    public save(key : string, content : any) : void {
        chrome.storage.sync.set({ [key]: content });
    }

}