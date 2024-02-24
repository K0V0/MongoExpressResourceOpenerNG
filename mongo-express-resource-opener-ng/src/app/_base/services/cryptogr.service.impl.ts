import {MessageResponse} from "../interfaces/messaging.interface";
import {BaseUtil} from "../utils/base.util";
import {GenerateRandomPassQuery} from "../interfaces/messaging/generate-random-pass.query";
import {CryptogrService} from "./cryptogr.service";
import {Injectable} from "@angular/core";
import {DecryptTextQuery} from "../interfaces/messaging/decrypt-text.query";
import {EncryptTextQuery} from "../interfaces/messaging/encrypt-text.query";

@Injectable({
  providedIn: 'root'
})
export class CryptogrServiceImpl implements CryptogrService {

  public static encryptStatic(text: string, secret: string): Promise<MessageResponse> {
    return BaseUtil.sendMessage(
      new EncryptTextQuery().withText(text).withSecret(secret));
  }

  public static decryptStatic(encryptedText: string, secret: string): Promise<MessageResponse> {
    return BaseUtil.sendMessage(
      new DecryptTextQuery().withText(encryptedText).withSecret(secret));
  }

  public generateRandomString(length: number): Promise<MessageResponse> {
    return BaseUtil.sendMessage(
      new GenerateRandomPassQuery().withLength(length));
  }

  public decrypt(hash: string, secret: string): Promise<MessageResponse> {
    return BaseUtil.sendMessage(
      new DecryptTextQuery().withText(hash).withSecret(secret));
  }

  public encrypt(plainText: string, secret: string): Promise<MessageResponse> {
    return BaseUtil.sendMessage(
      new EncryptTextQuery().withText(plainText).withSecret(secret));
  }

}
