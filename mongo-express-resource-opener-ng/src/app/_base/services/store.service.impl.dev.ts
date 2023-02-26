import { StoreService } from "./store.service";

/** 
 *  This implementation should run on localhost development session or in webpage mode
*/

export class StoreServiceImplDev implements StoreService {

    public load(key : string) : Promise<any> {
        return new Promise((resolve, reject) => {
            // timeout set to simulate ngModel problem and chrome storage synce delay
            setTimeout(() => {
                console.log("get data from browser local storage"); 
                console.log(localStorage.getItem(key));
                resolve(localStorage.getItem(key));
            }, 10000);
        });
    }

    public save(key: string, content : any) : void {
        console.log("set data to local storage");
        localStorage.setItem(key, content);
    }

}