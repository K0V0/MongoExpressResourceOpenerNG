import {Injectable} from "@angular/core";
import {StoreLocalService} from "./store-local.service";
import {StoreServiceImpl} from "./store.service.impl";
import {BaseUtil} from "../utils/base.util";
import {MessageIds} from "../interfaces/messaging.interface";

@Injectable({
  providedIn : 'root'
})
export class StoreLocalServiceImpl extends StoreServiceImpl implements StoreLocalService {

  load(key: string): Promise<any> {
    return BaseUtil.sendMessage(super.createGetRequest(MessageIds.GET_DATA_FROM_LOCAL_STORE, key));
    //return Promise.resolve(undefined);
    // return new Promise((resolve, reject) => {
    //   if (key !== undefined && key !== null) {
    //     let result : string | null = localStorage.getItem(key);
    //     if (result !== null) {
    //       resolve(JSON.parse(result));
    //     } else {
    //       resolve(null);
    //     }
    //   } else {
    //     reject("No key for data defined");
    //   }
    // });
  }

  loadWithKey(key: string): Promise<any> {
    return BaseUtil.sendMessage(super.createGetRequest(MessageIds.GET_DATA_FROM_LOCAL_STORE_WRAPPED, key));
    // return new Promise((resolve, reject) => {
    //   this.load(key)
    //     .then((result : any) => { resolve({ [key]: result }); })
    //     .catch((reason) => reject(reason));
    // });
  }

  save(key: string, content: any): Promise<any> {
    return new Promise((resolve, reject) => {
      if (content !== undefined) {
        resolve(localStorage.setItem(key, JSON.stringify(content)));
      } else {
        reject("No data passed into local storage");
      }
    });
  }

}
