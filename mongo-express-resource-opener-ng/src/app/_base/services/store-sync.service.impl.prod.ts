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
    }

    public loadWithKey(key : string) : Promise<any> {
        return BaseUtil.sendMessage(super.createGetRequest(MessageIds.GET_DATA_FROM_SYNC_STORE_WRAPPED, key));
    }

    public save(key : string, content : any) : Promise<any> {
        return BaseUtil.sendMessage(super.createPutRequest(MessageIds.PUT_DATA_TO_SYNC_STORE, key, content));
    }

}
