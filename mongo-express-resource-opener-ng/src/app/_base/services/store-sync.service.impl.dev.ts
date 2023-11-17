// angular imports
import { Injectable } from "@angular/core";

// my imports
import {StoreSyncService} from "./store-sync.service";

/**
 *  This implementation should run on localhost development session or in webpage mode
*/

@Injectable({
    providedIn : 'root'
})
export class StoreSyncServiceImplDev implements StoreSyncService {

    public SAVING_DELAY = 5000;
    public LOADING_DELAY = 1000;

    public load(key : string | number) : Promise<any> {
        return new Promise((resolve, reject) => {
            if (key !== undefined && key !== null) {
                this.loadingSimulation(String(key))
                    .then((result : any) => { resolve(result); })
                    .catch(() => reject("No data found in localStorage"));
            } else {
                reject("No key for data defined");
            }
        });
    }

    public loadWithKey(key : string) : Promise<any> {
        return new Promise((resolve, reject) => {
            this.load(key)
                .then((result : any) => { resolve({ [key]: result }); })
                .catch((reason) => reject(reason));
        });
    }

    public save(key: string | number, content : any) : Promise<any> {
        return new Promise((resolve, reject) => {
            if (content !== undefined) {
                this.saveingSimulation(String(key), content)
                    .then((result : any) => { resolve(result); })
            } else {
                reject("No data passed into local storage")
            }
        });
    }

    private handleJsonNull(key : string) : string {
        let result : string | null = localStorage.getItem(key);
        return result === null ? "{}" : result;
    }

    private loadingSimulation(key : string) : Promise<any> {
        var context = this;
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let resultString = context.handleJsonNull(key);
                resultString !== "{}" ? resolve(JSON.parse(resultString)) : reject("No data in localStorage");
            }, this.LOADING_DELAY);
        });
    }

    private saveingSimulation(key : string, value : any) : Promise<any> {
        var context = this;
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                localStorage.setItem(key, JSON.stringify(value));
                resolve("dummy");
            }, this.SAVING_DELAY);
        });
    }

}
