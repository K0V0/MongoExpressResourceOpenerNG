import {MessagingAbstract} from "../messaging.abstract";

export class GetSettingsFromAllStoresOrDefaultsQuery extends MessagingAbstract<string> {
  getMessageId(): number {
    return 31;
  }

}
