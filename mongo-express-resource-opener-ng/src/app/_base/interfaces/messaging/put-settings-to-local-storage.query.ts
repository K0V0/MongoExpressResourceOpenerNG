import {MessagingAbstract} from "../messaging.abstract";
import {PutSettingsMessage} from "../messaging.interface";

export class PutSettingsToLocalStorageQuery extends MessagingAbstract<PutSettingsMessage> {
  getMessageId(): number {
    return 8;
  }

}
