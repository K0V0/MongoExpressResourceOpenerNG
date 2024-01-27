import {Injectable} from "@angular/core";
import {StoreLocalService} from "./store-local.service";
import {StoreServiceImpl} from "./store.service.impl";
import {BaseUtil} from "../utils/base.util";
import {
  GetSettingsFromLocalStoreOrDefaultsQuery
} from "../interfaces/messaging/get-settings-from-local-store-or-defaults.query";
import {PutSettingsToLocalStorageQuery} from "../interfaces/messaging/put-settings-to-local-storage.query";

@Injectable({
  providedIn : 'root'
})
export class StoreLocalServiceImpl extends StoreServiceImpl implements StoreLocalService {

  load(key: string): Promise<any> {
    return BaseUtil.sendMessage(new GetSettingsFromLocalStoreOrDefaultsQuery(key));
  }

  save(key: string, content: any): Promise<any> {
    super.save(key, content);
    return BaseUtil.sendMessage(new PutSettingsToLocalStorageQuery(this.putMessage))
  }

}
