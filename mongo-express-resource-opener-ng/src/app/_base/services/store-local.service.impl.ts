import {Injectable} from "@angular/core";
import {StoreLocalService} from "./store-local.service";
import {BaseUtil} from "../utils/base.util";
import {
  GetSettingsFromLocalStoreOrDefaultsQuery
} from "../interfaces/messaging/get-settings-from-local-store-or-defaults.query";
import {PutSettingsToLocalStorageQuery} from "../interfaces/messaging/put-settings-to-local-storage.query";

@Injectable({
  providedIn : 'root'
})
export class StoreLocalServiceImpl implements StoreLocalService {

  load(key: string): Promise<any> {
    return BaseUtil.sendMessage(new GetSettingsFromLocalStoreOrDefaultsQuery().withKey(key));
  }

  save(key: string, content: any): Promise<any> {
    return BaseUtil.sendMessage(new PutSettingsToLocalStorageQuery().withKey(key).withValue(content))
  }

}
