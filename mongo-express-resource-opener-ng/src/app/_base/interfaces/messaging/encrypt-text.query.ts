import {CryptoQuery} from "./base/crypto.query";

export class EncryptTextQuery extends CryptoQuery {
  getMessageId(): number {
    return 11;
  }

}
