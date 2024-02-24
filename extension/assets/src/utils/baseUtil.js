
function sendMessage(message, options = {}) {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(message, options, response => {
      if (chrome.runtime.lastError) {
        console.error("Error after sedning message to message API: " + chrome.runtime.lastError);
        reject(chrome.runtime.lastError);
      } else {
        resolve(response);
      }
    });
  });
}

function getMessageResponseObject(status, data) {
  const state = status ? "OK" : "FAIL";
  return {
    status: state,
    data: data
  };
}

function deepFreeze(obj) {
  Object.freeze(obj);
  Object.getOwnPropertyNames(obj).forEach((prop) => {
    const propValue = obj[prop];
    if (typeof propValue === 'object' && propValue !== null && !Object.isFrozen(propValue)) {
      deepFreeze(propValue);
    }
  });
  return obj;
}

function logger(message,  ...params) {
  const placeholder = "{}";
  const error = new Error();
  const stack = error.stack.split('\n')[2].trim();

  let formattedMessage = message;
  for (let i = 0; i < params.length; i++) {
    let param = isObject(params[i])
      ? JSON.stringify(params[i], null, 2)
      : params[i];

    formattedMessage = formattedMessage.replace(placeholder, param);
  }

  console.log(`[${stack}] ${formattedMessage}`);
}

function getKeyByValue(object, value) {
  for (const key in object) {
    if (object.hasOwnProperty(key) && object[key] === value) {
      return key;
    }
  }
  return null; // Return null if the value is not found
}

function isObject(variable) {
  return variable !== null && typeof variable === 'object';
}
