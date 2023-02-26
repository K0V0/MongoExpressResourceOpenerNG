// Angular imports
import 'reflect-metadata';

// My imports
import { StoreService } from '../../services/store.service';
import { StoreServiceImplDev } from '../../services/store.service.impl.dev';
import { StoreServiceImplProd } from '../../services/store.service.impl.prod';
import { EnviromentUtil, RuntimeEnviroment } from '../../utils/enviroment.util';
import { SettingDecoratorParameters } from './setting.decorator.parameters';
import { SettingDecoratorConverter } from './setting.decorator.converter';
import { BaseComponent } from 'src/app/_base/components/_base/base.component';


/**
 *  Loads value from Chrome settings storage, or sets default value if provided 
 *  or common backup scenario  for given type.
 *  Sends value into Chrome settings storage if value is changed.
*/
export const Setting = (params ?: SettingDecoratorParameters) => (target: BaseComponent, propertyKey: string) => {
    // should run only 1st time during class init, after that all annotated values should not be undefined
    SettingDecorator.getInstance().loadValue(target, propertyKey, (params === undefined) ? {} : params);
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
                EnviromentUtil.runningAt() === RuntimeEnviroment.WEB ? new StoreServiceImplDev() : new StoreServiceImplProd()
            )
        }
        return this.instance;
    }

    public loadValue(target : Object, propertyKey : string, params : SettingDecoratorParameters) : void {

        let settingKey : string = params['storeKey'] === undefined
            ? target.constructor.name + "-" + propertyKey 
            : params['storeKey']

        SettingDecorator.storeService
            .load(settingKey)
            .then((resolve : any) => {
                // undefined should be edge case
                return resolve;
            })
            .catch((error : any) => {
                // communication error or not found in store should be that case
                return undefined;
            })
            .then((result : any) => {

                let fieldValue : any;
                if (result !== undefined) {
                    // value was found in settings store
                    fieldValue  = SettingDecorator.getOrConvertedValue(result, params, 'storeConversion');
                } else if (SettingDecorator.hasParam(params, 'defaultValue')) {
                    // value was not found in settings store but default one exists
                    fieldValue = params['defaultValue'];
                } else {
                    // no value and no default one, try to set one for most common types
                    fieldValue = SettingDecorator.getCommonDefaultValue(target, propertyKey);
                }

                // "decorate" fields, replace field value by value from settings store 
                // or send updated value to settings store
                let currentValue : any = Object(target)[propertyKey];
                let uploadAllowed : boolean = !(SettingDecorator.hasParam(params, 'onlyDownload') && params['onlyDownload'] === true);
                Object.defineProperty(target, propertyKey, {
                    get: function() {
                        return currentValue === undefined ? fieldValue : currentValue;
                    },
                    set: function(value) {
                        if (currentValue != value) {
                            currentValue = value;
                            if (uploadAllowed) {
                                SettingDecorator.storeService.save(
                                    settingKey, 
                                    SettingDecorator.getOrConvertedValue(value, params, 'modelConversion'));
                            }
                        }
                    },
                    configurable: true
                })
            })
            .catch((error : any) => {
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

    private static getOrConvertedValue(valueToConvert : any, params : SettingDecoratorParameters, converterType : string) : any {
        let converters : SettingDecoratorConverter<any, any> | undefined = params['converter'];
        if (converters === undefined) {
            return valueToConvert;
        }
        let converter : Function = Object(converters)[converterType];
        if (converter === undefined) {
            return valueToConvert;
        }
        return converter(valueToConvert);
    }

    private static hasParam(params: SettingDecoratorParameters, ...paramNames : string[]) : boolean {
        let tmp : any = params;
        for (let i=0; i<paramNames.length; i++) {
            tmp = tmp[paramNames[i]];
            if (tmp === undefined) {
                return false;
            } 
        }
        return true;
    }
    
}