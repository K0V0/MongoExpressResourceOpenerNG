import {StoreService} from "./store.service";
import {PutSettingsMessage} from "../interfaces/messaging.interface";

export abstract class StoreServiceImpl implements StoreService {

  protected putMessage : PutSettingsMessage = {
    key: "",
    value: null
  };

  // protected getMessage : GetSettingsMessage = {
  //   key: ""
  // }

  load(key: string): Promise<any> {
    // this.getMessage = new class implements GetSettingsMessage {
    //   key = key;
    // }
    return Promise.resolve(undefined);
  }

  save(key: string, content: any): Promise<any> {
    this.putMessage = new class implements PutSettingsMessage {
      key = key;
      value = content;
    }
    return Promise.resolve(undefined);
  }

}
