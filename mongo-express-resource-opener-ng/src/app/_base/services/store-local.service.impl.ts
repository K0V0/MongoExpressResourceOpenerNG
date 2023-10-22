import {Injectable} from "@angular/core";
import {StoreLocalService} from "./store-local.service";

@Injectable({
  providedIn : 'root'
})
export class StoreLocalServiceImpl implements StoreLocalService {

  load(key: string): Promise<any> {
    //return Promise.resolve(undefined);
    return new Promise((resolve, reject) => {
      if (key !== undefined && key !== null) {
        //todo
      } else {
        reject("No key for data defined");
      }
    });
  }

  loadWithKey(key: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.load(key)
        .then((result : any) => { resolve({ [key]: result }); })
        .catch((reason) => reject(reason));
    });
  }

  save(key: string, content: any): Promise<any> {
    return new Promise((resolve, reject) => {
      if (content !== undefined) {
        //todo
      } else {
        reject("No data passed into local storage")
      }
    });
  }

}
