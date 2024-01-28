///<reference types="chrome"/>

import {Injectable} from "@angular/core";
import {StoreSyncService} from "./store-sync.service";
import {StoreServiceImpl} from "./store.service.impl";
import {BaseUtil} from "../utils/base.util";
import {
  GetSettingsFromSyncStoreOrDefaultsQuery
} from "../interfaces/messaging/get-settings-from-sync-store-or-defaults.query";
import {PutSettingsToSyncStoreQuery} from "../interfaces/messaging/put-settings-to-sync-store.query";

/**
 *  This implementation runs when extension is built and packed
*/

@Injectable({
    providedIn : 'root'
})
export class StoreSyncServiceImplProd extends StoreServiceImpl implements StoreSyncService {

  public load(key : string) : Promise<any> {
    return BaseUtil.sendMessage(new GetSettingsFromSyncStoreOrDefaultsQuery(key))
  }

  public save(key : string, content : any) : Promise<any> {
    super.save(key, content);
    return BaseUtil.sendMessage(new PutSettingsToSyncStoreQuery(this.putMessage))
  }

}
