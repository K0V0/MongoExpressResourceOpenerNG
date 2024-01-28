import {MessagingAbstract} from "../messaging.abstract";

export class GetSettingsFromLocalStoreOrDefaultsQuery extends MessagingAbstract<string> {
  getMessageId(): number {
    return 71;
  }

}
