// Angular imports
import 'reflect-metadata';

// My imports
import { StoreService } from './../services/store.service';


interface SettingDecoratorParameters {
    // default value to use if no value in chrome store is found 
    defaultValue ?: any;
    // allow passing "undefined" as default value (which is default value of unitialized property by default)
    allowUndefined ?: boolean;
    // TODO
    // define own key under which is value stored in google chrome storage
    // by default mechanism uses containing class and property name combination as key
    storeKey ?: string;
    // switch into uni-directional relationship with chrome store, value will be transfered from chrome store
    // and set to property, but no other way round. By default, binding is bi-directional
    onlyDownload ?: boolean;
    // provide converter fullfiling SettingDecoratorConverter interface specification if You need your data 
    // have converted/modified when coming from/to chrome store
    converter ?: SettingDecoratorConverter<any, any>
}

export interface SettingDecoratorConverter<TYPE_IN_NG, TYPE_IN_STORE> {
    // in implementing class, return null if You do not want conversion in some direction
    // model -> settings store
    modelConversion : (content : TYPE_IN_NG) => TYPE_IN_STORE | undefined; 
    // settings store -> model
    storeConversion : (content : TYPE_IN_STORE) => TYPE_IN_NG | undefined;
}

export  abstract class SettingDecoratorConverterBase<TYPE_IN_NG, TYPE_IN_STORE> 
        implements SettingDecoratorConverter<TYPE_IN_NG, TYPE_IN_STORE> 
{
    protected abstract mapForNgModel(content : TYPE_IN_STORE) : TYPE_IN_NG;
    protected abstract mapForStore(content : TYPE_IN_NG) : TYPE_IN_STORE;

    public storeConversion(content : TYPE_IN_STORE) : TYPE_IN_NG | undefined {
        if (content === undefined) {
            return undefined;
        }
        return this.mapForNgModel(content);
    }

    public modelConversion(content: TYPE_IN_NG) : TYPE_IN_STORE | undefined {
        if (content === undefined) {
            return undefined;
        }
        return this.mapForStore(content);
    }
}

/**
 *  Loads value from Chrome settings storage, or sets default value if provided 
 *  or common backup scenario  for given type.
 *  Sends value into Chrome settings storage if value is changed.
*/
export const Setting = (params ?: SettingDecoratorParameters) => (target: Object, propertyKey: string) => {
    // should run only 1st time during class init, after that 
    // all annotated values should not be undefined
    SettingDecorator.getInstance().loadValue(target, propertyKey, params);
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

    public loadValue(target : Object, propertyKey : string, params : any) : void {

        let settingKey : string = SettingDecorator.hasParam(params, 'storeKey') 
            ? params['storeKey'] 
            : target.constructor.name + "-" + propertyKey;

        SettingDecorator.storeService
            .load(settingKey)
            .then((resolve) => {
                // undefined should be edge case
                console.log("setting resolved: ");
                console.log(resolve);
                //return resolve[settingKey];
                return resolve;
            })
            .catch((error) => {
                // communication error or not found in store should be that case
                console.log("setting resolve error: ");
                console.log(error);
                return undefined;
            })
            .then((result) => {

                console.log("setting resolve final stage: ");
                console.log(result);

                let fieldValue : any;
                // value was found in settings store
                if (result !== undefined) {
                    // console.log(propertyKey);
                    // console.log(params);
                    if (SettingDecorator.hasParam(params, 'converter') 
                            && params['converter']['storeConversion'] !== undefined
                            && params['converter']['storeConversion'](result) !== undefined) {
                        console.log("final strage conversion");
                        fieldValue = params['converter']['storeConversion'](result);
                    } else {
                        fieldValue = result;
                    }
                }
                // value was not found in settings store but default one exists
                else if (SettingDecorator.hasParam(params, 'defaultValue')) {
                    console.log("Setting resolve final stage: using default vals");
                    fieldValue = params['defaultValue'];
                }
                // no value and no default one, try to set one for most common types
                else {
                    console.log("Setting resolve final stage: try setting common default");
                    fieldValue = SettingDecorator.getCommonDefaultValue(target, propertyKey);
                }

                // "decorate" fields, replace field value by value from settings store 
                // or send updated value to settings store
                let currentValue : any = Object(target)[propertyKey];
                let uploadAllowed : boolean = !(SettingDecorator.hasParam(params, 'onlyDownload') && params['onlyDownload'] === true);

                // console.log("uploadAllowed");
                // console.log(uploadAllowed);
                
                Object.defineProperty(target, propertyKey, {
                    get: function() {
                        console.log('define property: get');
                        return currentValue === undefined ? fieldValue : currentValue;
                    },
                    set: function(value) {
                        console.log('define property: set');
                        if (currentValue != value) {
                            currentValue = value;
                            if (uploadAllowed) {
                                let valueToUpload : any;
                                //TODO refucktor
                                if (SettingDecorator.hasParam(params, 'converter') 
                                        && params['converter']['modelConversion'] !== undefined
                                        && params['converter']['modelConversion'](value) !== undefined) {
                                    valueToUpload = params['converter']['modelConversion'](value);
                                } else {
                                    valueToUpload = value;
                                }
                                // console.log("value to upload");
                                // console.log(valueToUpload);
                                SettingDecorator.storeService.save(settingKey, valueToUpload);
                            }
                        }
                    },
                    configurable: true
                })

                // console.log("value finally used: ");
                // console.log(propertyKey);
                // console.log(params);
                // console.log(Object(target)[propertyKey]); // mylo by sspustit tento mock

            })
            .catch((error) => {
                console.log(error);
            }); 

    }

    private static getCommonDefaultValue(target : Object, propertyKey : string) : any {
        let fieldType : string = Reflect.getMetadata("design:type", target, propertyKey).name;
        switch(fieldType) {
            case 'Boolean':
                return false;
            default:
                return null; 
        }
    }

    private static hasParam(params: SettingDecoratorParameters, paramName : string) : boolean {
        return params !== undefined && Object(params)[paramName] !== undefined;
    }
    
}