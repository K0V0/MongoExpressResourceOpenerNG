import {MessagingAbstract} from "../messaging.abstract";
import {PutSettingsMessage} from "../messaging.interface";

export class PutSettingsToSyncStoreQuery extends MessagingAbstract<PutSettingsMessage> {
  getMessageId(): number {
    return 9;
  }

}
