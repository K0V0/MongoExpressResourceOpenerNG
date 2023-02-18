// Angular imports
import 'reflect-metadata';

// My imports
import { StoreService } from '../services/store.service';

export interface GetSettingDecoratorParameters {
    defaultValue ?: any;
    allowUndefined ?: boolean;
    storeKey ?: string;
}

/**
 *  Loads value from Chrome settings storage, or sets default value if provided 
 *  or common backup scenario  for given type.
*/
export const GetSetting = (params ?: GetSettingDecoratorParameters) => (target: Object, propertyKey: string) => {
    // should run only 1st time during class init, after that 
    // all annotated values should not be undefined
    GetSettingDecorator.getInstance().loadValue(target, propertyKey, params);
}

export class GetSettingDecorator {

    private static instance : GetSettingDecorator;

    private static storeService : StoreService;

    private constructor(storeService : StoreService) {
        GetSettingDecorator.storeService = storeService;
    }

    public static getInstance() : GetSettingDecorator {
        // must be solved that shitty way, because standart dependency injection comes too late
        if (this.instance === undefined) {
            this.instance = new GetSettingDecorator(
                new StoreService()
            )
        }
        return this.instance;
    }

    public loadValue(
        target : Object, 
        propertyKey : string, 
        params : GetSettingDecoratorParameters | undefined) 
        : void 
    {
        let settingKey : string = target.constructor.name + "-" + propertyKey;

        GetSettingDecorator.storeService
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
                else if (params !== undefined && params['defaultValue'] !== undefined) {
                    fieldValue = params['defaultValue'];
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
                console.log("getSEtting");
                console.log(currentValue);
                console.log(currentValue === undefined);
                console.log(fieldValue);   
                // Object.defineProperty(target, propertyKey, {
                //     get: function() {
                //         return currentValue === undefined ? fieldValue : currentValue;
                //     },
                //     set: function(value : any) {
                //         if (currentValue != value) {
                //             currentValue = value;
                //         }
                //     },
                //     configurable: true
                // })
                // "decorate" fields, replace field value by value from settings store 
                // or send updated value to settings store
                Object.defineProperty(target, propertyKey, {
                    get: function() {
                        return currentValue === undefined ? fieldValue : currentValue;
                    },
                    set: function(value) {
                        if (currentValue != value) {
                            currentValue = value;
                            GetSettingDecorator.storeService.save(settingKey, value);
                        }
                    }
                })
            }); 
    }
}