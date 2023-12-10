
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
