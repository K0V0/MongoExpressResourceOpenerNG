import {MessagingAbstract} from "../messaging.abstract";

export class GetSettingsFromSyncStoreOrDefaultsQuery extends MessagingAbstract<string>{
  getMessageId(): number {
    return 61;
  }

}
