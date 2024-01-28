importScripts(
  './background/services/cryptogrService.js'
);

function CryptogrController() {

}

CryptogrController.prototype.constructor = CryptogrController;

CryptogrController.prototype.CRYPTOGR_SERVICE = new CryptogrService();



CryptogrController.prototype.generateHash = (data, responseCallback) => {
  logger("String to generate with length: {}", data.length);
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  logger("Generated string: {}", result);
  responseCallback(getMessageResponseObject(true, result));
}

CryptogrController.prototype.encrypt = (data, responseCallback) => {
  logger("Data to encrypt: {}", data);
  CryptogrController.prototype.CRYPTOGR_SERVICE
    ._encrypt(data.text, data.secret)
    .then(resolve => responseCallback(getMessageResponseObject(true, resolve)))
    .catch(reject => responseCallback(getMessageResponseObject(false, reject)));
}

CryptogrController.prototype.decrypt = (data, responseCallback) => {
  logger("Data to decrypt: {}", data);
  CryptogrController.prototype.CRYPTOGR_SERVICE
    ._decrypt(data.text, data.secret)
    .then(resolve => responseCallback(getMessageResponseObject(true, resolve)))
    .catch(reject => responseCallback(getMessageResponseObject(false, reject)));
}


