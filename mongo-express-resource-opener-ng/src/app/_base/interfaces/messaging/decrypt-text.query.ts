import {CryptoQuery} from "./base/crypto.query";

export class DecryptTextQuery extends CryptoQuery {
  getMessageId(): number {
    return 12;
  }

}
