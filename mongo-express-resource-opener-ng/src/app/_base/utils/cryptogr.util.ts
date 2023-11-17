import * as CryptoJS from 'crypto-js';

export class CryptogrUtil {

  public static generateRandomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
    return result;
  }

  public static encrypt(text: string, secret: string): string {
    console.log(text);
    return CryptoJS.AES.encrypt(text, secret).toString();
  }

  public static decrypt(encryptedText: string, secret: string): string {
    return CryptoJS.AES.decrypt(encryptedText, secret).toString(CryptoJS.enc.Utf8);
  }

}
