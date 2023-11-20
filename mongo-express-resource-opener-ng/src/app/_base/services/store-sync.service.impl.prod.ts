///<reference types="chrome"/>

import {Injectable} from "@angular/core";
import {StoreSyncService} from "./store-sync.service";
import {BaseUtil} from "../utils/base.util";
import {MessageIds, StoreRequestMessage} from "../interfaces/messaging.interface";
import {StoreServiceImpl} from "./store.service.impl";

/**
 *  This implementation runs when extension is built and packed
*/

@Injectable({
    providedIn : 'root'
})
export class StoreSyncServiceImplProd extends StoreServiceImpl implements StoreSyncService {

    public load(key : string) : Promise<any> {
        return BaseUtil.sendMessage(super.createGetRequest(MessageIds.GET_DATA_FROM_SYNC_STORE, key));
        // return new Promise((resolve, reject) => {
        //     chrome.storage.sync.get(key, data => {
        //         Object.keys(data).length === 0 && data.constructor === Object
        //             ? reject('No data returned by localStorage')
        //             : resolve(data[key]);
        //     });
        // });
    }

    public loadWithKey(key : string) : Promise<any> {
        return BaseUtil.sendMessage(super.createGetRequest(MessageIds.GET_DATA_FROM_SYNC_STORE_WRAPPED, key));
        // var context = this;
        // return new Promise((resolve, reject) => {
        //     context.load(key)
        //         .then((result : any) => resolve({ [key]: result }))
        //         .catch((reason) => reject(reason));
        // });
    }

    public save(key : string, content : any) : Promise<any> {
        return BaseUtil.sendMessage(super.createPutRequest(MessageIds.PUT_DATA_TO_SYNC_STORE, key, content));
        // return new Promise((resolve, reject) => {
        //     if (key === undefined || content === undefined) {
        //         reject('No data passed to localStorage');
        //     } else {
        //         chrome.storage.sync
        //             .set({ [key]: content })
        //             .then((result : any) => { resolve(result); });
        //     }
        // });
    }

}
