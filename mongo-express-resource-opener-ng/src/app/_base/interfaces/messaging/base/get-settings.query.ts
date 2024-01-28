import {MessagingAbstract} from "../../messaging.abstract";
import {GetSettingsMessage} from "../../messaging.interface";

export abstract class GetSettingsQuery extends MessagingAbstract<GetSettingsMessage> {

  public withKey(key: string): this {
    return this.w('key', key);
  }
}
