import {MessagingAbstract} from "../messaging.abstract";

export class OpenInNewTabQuery extends MessagingAbstract<string[]> {

  getMessageId(): number {
    return 5;
  }

}
