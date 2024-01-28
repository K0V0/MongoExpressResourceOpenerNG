import * as CryptoJS from "crypto-js";

function CryptoService() {

}

CryptoService.prototype.constructor = CryptoService;

CryptoService.prototype.generateRandomString = function(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
}

CryptoService.prototype.encrypt = function(text, secret) {
  if (!text || !secret) {
    return null;
  }
  return CryptoJS.AES.encrypt(text, secret).toString();
}

CryptoService.prototype.decrypt = function(encryptedText, secret) {
  if (!encryptedText || !secret) {
    return null;
  }
  return CryptoJS.AES.decrypt(encryptedText, secret).toString(CryptoJS.enc.Utf8);
}
