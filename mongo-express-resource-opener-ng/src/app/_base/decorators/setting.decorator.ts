// Angular imports
import 'reflect-metadata';

// My imports
import { StoreService } from './../services/store.service';

/**
 *  Loads value from Chrome settings storage, or sets default value if provided 
 *  or common backup scenario  for given type.
 *  Sends value into Chrome settings storage if value is changed.
*/
export const Setting = (defaultValue?: any) => (target: Object, propertyKey: string) => {
    // should run only 1st time during class init, after that 
    // all annotated values should not be undefined
    SettingDecorator.getInstance().loadValue(target, propertyKey, defaultValue);
}

class SettingDecorator {

    private static instance : SettingDecorator;

    private static storeService : StoreService;

    private constructor(storeService : StoreService) {
        SettingDecorator.storeService = storeService;
    }

    public static getInstance() : SettingDecorator {
        // must be solved that shitty way, because standart dependency injection comes too late
        if (this.instance === undefined) {
            this.instance = new SettingDecorator(
                new StoreService()
            )
        }
        return this.instance;
    }

    public loadValue(target : Object, propertyKey : string, defaultValue : any) : void {

        let settingKey : string = target.constructor.name + "-" + propertyKey;

        SettingDecorator.storeService
            .load(settingKey)
            .then((resolve) => {
                // undefined should be edge case
                return resolve[settingKey];
            })
            .catch((error) => {
                // communication error or not found in store should be that case
                return undefined;
            })
            .then((result) => {

                let fieldValue : any;
                // value was found in settings store
                if (result !== undefined) {
                    fieldValue = result;
                }
                // value was not found in settings store but default one exists
                else if (defaultValue !== undefined) {
                    fieldValue = defaultValue;
                }
                // no value and no default one, try to set one for most common types
                else {
                    let fieldType : string = Reflect.getMetadata("design:type", target, propertyKey).name;
                    switch(fieldType) {
                        case 'Boolean':
                            fieldValue = false;
                            break;
                        default:
                            fieldValue = null; 
                    }
                }

                // "decorate" fields, replace field value by value from settings store 
                // or send updated value to settings store
                let currentValue : any = Object(target)[propertyKey]; 
                Object.defineProperty(target, propertyKey, {
                    get: function() {
                        return currentValue === undefined ? fieldValue : currentValue;
                    },
                    set: function(value) {
                        if (currentValue != value) {
                            currentValue = value;
                            SettingDecorator.storeService.save(settingKey, value);
                        }
                    }
                })
            }); 
    }
}