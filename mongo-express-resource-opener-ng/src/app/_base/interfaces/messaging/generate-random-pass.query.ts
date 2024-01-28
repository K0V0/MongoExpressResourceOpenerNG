import {MessagingAbstract} from "../messaging.abstract";
import {CryptoUtilGenerateRandomPassMessage} from "../messaging.interface";

export class GenerateRandomPassQuery extends MessagingAbstract<CryptoUtilGenerateRandomPassMessage> {
  getMessageId(): number {
    return 10;
  }

  public withLength(length: number) : this {
    return this.w('length', length);
  }
}
