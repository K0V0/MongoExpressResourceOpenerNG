import {Injectable} from "@angular/core";
import {StoreLocalService} from "./store-local.service";
import {StoreServiceImpl} from "./store.service.impl";
import {BaseUtil} from "../utils/base.util";
import {
  GetSettingsFromLocalStoreOrDefaultsQuery
} from "../interfaces/messaging/get-settings-from-local-store-or-defaults.query";

@Injectable({
  providedIn : 'root'
})
export class StoreLocalServiceImpl extends StoreServiceImpl implements StoreLocalService {

  load(key: string): Promise<any> {
    return BaseUtil.sendMessage(new GetSettingsFromLocalStoreOrDefaultsQuery(key));
  }

  save(key: string, content: any): Promise<any> {
    //TODO migrate to messaging API
    return new Promise((resolve, reject) => {
      if (content !== undefined) {
        resolve(localStorage.setItem(key, JSON.stringify(content)));
      } else {
        reject("No data passed into local storage");
      }
    });
  }

}
