import {MessagingAbstract} from "../messaging.abstract";
import {FindDocumentMessage} from "../messaging.interface";

export class FindDocumentQuery extends MessagingAbstract<FindDocumentMessage> {
  getMessageId(): number {
    return 2;
  }

  public withResourceId(resourceId : string) : this {
    return this.w('resourceId', resourceId);
  }

}
