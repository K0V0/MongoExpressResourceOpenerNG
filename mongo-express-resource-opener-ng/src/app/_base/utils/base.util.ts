import {Message} from "../interfaces/messaging.interface";

//TODO make comehow visible for both angular and JS part of app
export class BaseUtil {

    public static deepClone<TYP>(originalObject : TYP) : TYP {
        if (this.isPrimitive(originalObject)) {
            return originalObject;
        }
        return JSON.parse(JSON.stringify(originalObject));
    }

    public static isPrimitive(value: any) {
        return value !== Object(value);
    }

    public static deepCompare(obj1: any, obj2: any) : boolean {
        // Check if both objects are null or undefined
        if (obj1 === null || obj1 === undefined || obj2 === null || obj2 === undefined) {
            return obj1 === obj2;
        }

        // Check if both objects are of the same type
        if (typeof obj1 !== typeof obj2) {
            return false;
        }

        // Check if both objects are primitive types
        if (typeof obj1 === 'number' || typeof obj1 === 'string' || typeof obj1 === 'boolean' || typeof obj1 === 'symbol') {
            return obj1 === obj2;
        }

        // Check if both objects are arrays
        if (Array.isArray(obj1)) {
            if (!Array.isArray(obj2) || obj1.length !== obj2.length) {
                return false;
            }

            for (let i = 0; i < obj1.length; i++) {
                if (!BaseUtil.deepCompare(obj1[i], obj2[i])) {
                    return false;
                }
            }

            return true;
        }

        // Check if both objects are objects
        if (typeof obj1 === 'object') {
            const keys1 = Object.keys(obj1);
            const keys2 = Object.keys(obj2);

            if (keys1.length !== keys2.length) {
                return false;
            }

            for (const key of keys1) {
                if (!BaseUtil.deepCompare(obj1[key], obj2[key])) {
                    return false;
                }
            }

            return true;
        }

        // Otherwise, the objects are not equal
        return false;
    }

    public static deepFreeze(obj: any) {
        Object.freeze(obj);

        Object.getOwnPropertyNames(obj).forEach((prop) => {
            const propValue = obj[prop];

            if (typeof propValue === 'object' && propValue !== null && !Object.isFrozen(propValue)) {
                BaseUtil.deepFreeze(propValue);
            }
        });

        return obj;
    }

    public static sendMessage(message : Message, options = {}) : Promise<Response> {
        return new Promise((resolve, reject) => {
            chrome.runtime.sendMessage(message, options, (response : Response) => {
                if (chrome.runtime.lastError) {
                    console.error("Error after sedning message to message API: " + chrome.runtime.lastError);
                    reject(chrome.runtime.lastError);
                } else {
                    resolve(response);
                }
            });
        });
    }

}
