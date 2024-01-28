import {MessageResponse} from "../interfaces/messaging.interface";

export interface CryptogrService {
  generateRandomString : (length : number) => Promise<MessageResponse>;
  encrypt : (plainText : string, secret : string) => Promise<MessageResponse>;
  decrypt : (hash : string, secret : string) => Promise<MessageResponse>;
}
