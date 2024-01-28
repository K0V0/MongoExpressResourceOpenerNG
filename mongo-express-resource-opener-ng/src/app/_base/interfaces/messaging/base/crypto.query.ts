import {MessagingAbstract} from "../../messaging.abstract";
import {CryptoUtilCipheringMesssage} from "../../messaging.interface";

export abstract class CryptoQuery extends MessagingAbstract<CryptoUtilCipheringMesssage> {
  public withText(text: string) : this {
    return this.w('text', text);
  }

  public withSecret(secret: string) : this {
    return this.w('secret', secret);
  }
}
