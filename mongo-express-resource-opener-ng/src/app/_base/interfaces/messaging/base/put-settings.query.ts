import {MessagingAbstract} from "../../messaging.abstract";
import {PutSettingsMessage} from "../../messaging.interface";

export abstract class PutSettingsQuery extends MessagingAbstract<PutSettingsMessage> {
  public withKey(key: string) : this {
    return this.w('key', key);
  }

  public withValue(value: any) : this {
    return this.w('value', value);
  }
}
