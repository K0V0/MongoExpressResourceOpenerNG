import {StoreAllService} from "./store-all.service";
import {BaseUtil} from "../utils/base.util";
import {StoreServiceImpl} from "./store.service.impl";
import {
  GetSettingsFromAllStoresOrDefaultsQuery
} from "../interfaces/messaging/get-settings-from-all-stores-or-defaults.query";

export class StoreAllServiceImpl extends StoreServiceImpl implements StoreAllService {

  load(key: string): Promise<any> {
    return BaseUtil.sendMessage(new GetSettingsFromAllStoresOrDefaultsQuery(key));
  }

  save(key: string, content: any): Promise<any> {
    return new Promise((resolve, reject) => {
      reject("Saving is not permitted using this service, key: " + key + ", content: " + content);
    });
  }

}
