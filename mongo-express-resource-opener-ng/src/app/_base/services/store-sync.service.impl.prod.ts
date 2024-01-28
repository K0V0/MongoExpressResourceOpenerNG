///<reference types="chrome"/>

import {Injectable} from "@angular/core";
import {StoreSyncService} from "./store-sync.service";
import {BaseUtil} from "../utils/base.util";
import {
  GetSettingsFromSyncStoreOrDefaultsQuery
} from "../interfaces/messaging/get-settings-from-sync-store-or-defaults.query";
import {PutSettingsToSyncStorageQuery} from "../interfaces/messaging/put-settings-to-sync-storage.query";

/**
 *  This implementation runs when extension is built and packed
*/

@Injectable({
    providedIn : 'root'
})
export class StoreSyncServiceImplProd implements StoreSyncService {

  public load(key : string) : Promise<any> {
    return BaseUtil.sendMessage(new GetSettingsFromSyncStoreOrDefaultsQuery().withKey(key))
  }

  public save(key : string, content : any) : Promise<any> {
    return BaseUtil.sendMessage(new PutSettingsToSyncStorageQuery().withKey(key).withValue(content))
  }

}
