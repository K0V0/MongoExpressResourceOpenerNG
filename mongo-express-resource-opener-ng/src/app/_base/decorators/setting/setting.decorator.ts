// Angular imports
import 'reflect-metadata';

// My imports
import { BaseUtil } from './../../utils/base.util';
import { EventsUtil } from './../../utils/events.util';
import { BaseComponent } from 'src/app/_base/components/_base/base.component';
import { StoreAllService } from '../../services/store-all.service';
import { EnviromentUtil } from '../../utils/enviroment.util';
import { SettingDecoratorConverter } from './setting.decorator.converter';
import { SettingDecoratorParameters } from './setting.decorator.parameters';
import { StoreSyncService } from "../../services/store-sync.service";
import { StoreLocalService } from "../../services/store-local.service";
import {StoreService} from "../../services/store.service";


/**
 *  Loads value from Chrome settings storage, or sets default value if provided
 *  or common backup scenario  for given type.
 *  Sends value into Chrome settings storage if value is changed.
*/
export const Setting = (params ?: SettingDecoratorParameters) => (target: BaseComponent, propertyKey: string) => {
    // should run only 1st time during class init, after that all annotated values should not be undefined
    SettingDecorator.getInstance().loadValue(target, propertyKey, (params === undefined) ? {} : params);
}


export class SettingDecorator {

    private static instance : SettingDecorator;

    private static syncStoreService : StoreService;

    private static localStoreService : StoreService;

    private constructor(syncStoreService : StoreSyncService, localStoreService : StoreLocalService) {
        SettingDecorator.syncStoreService = syncStoreService;
        SettingDecorator.localStoreService = localStoreService;
    }

    public static getInstance() : SettingDecorator {
        // must be solved that shitty way, because standart dependency injection comes too late
        if (this.instance === undefined) {
            this.instance = new SettingDecorator(
              EnviromentUtil.getStoreSyncService(), EnviromentUtil.getStoreLocalService());
        }
        return this.instance;
    }

    public loadValue(target : BaseComponent, propertyKey : string, params : SettingDecoratorParameters) : void {

        let settingsDecoratorContext : SettingDecorator = this;

        let settingKey : string = params['storeKey'] === undefined
            ? target.constructor.name + "-" + propertyKey
            : params['storeKey']

      settingsDecoratorContext.getStoreService(params)
            .load(settingKey)
            .then((resolve : any) => {
                // undefined should be edge case
                return resolve[settingKey];
            })
            .catch((error : any) => {
                // communication error or not found in store should be that case
                return undefined;
            })
            .then((result: any) => {
              if (params['executeBeforeAll']) {
                // TODO error
                // console.log("---------- result in decorator");
                // console.log(result);
                return settingsDecoratorContext.callbacksRunner('executeBeforeAll', params, result);
              }
              return result;
            })
            .then((result : any) => {

                let fieldValue : any;
                if (result !== undefined && result !== null) {
                    // value was found in settings store
                    fieldValue = SettingDecorator.getOrConvertedValue(result, params, 'storeConversion');
                } else if (SettingDecorator.hasParam(params, 'defaultValue')) {
                    // value was not found in settings store but default one exists
                    fieldValue = BaseUtil.deepClone(params['defaultValue']);
                } else {
                    // no value and no default one, try to set one for most common types
                    fieldValue = SettingDecorator.getCommonDefaultValue(target, propertyKey);
                }

                //FIXME this works only for primitive types, changing a property of object does not trigger set
                // "decorate" fields, replace field value by value from settings store or send updated value to settings store
                let currentValue : any = Object(target)[propertyKey];
                let uploadAllowed : boolean = !(SettingDecorator.hasParam(params, 'onlyDownload') && params['onlyDownload'] === true);
                Object.defineProperty(target, propertyKey, {
                  get: function() {
                    const value = (currentValue === undefined || currentValue === null) ? fieldValue : currentValue;
                    settingsDecoratorContext.callbacksRunner('executeOnGet', params, value);
                    return value;
                  },
                  set: async function(value) {
                    if (currentValue != value) {
                      currentValue = value;
                      if (uploadAllowed) {
                        // start of save process
                        EventsUtil.getSettingsSavedEmiter().emit(true);

                        // will affect currently displayed value
                        const beforeUpdateBeforeConvertContent = settingsDecoratorContext
                          .callbacksRunner('executeBeforeStoreBeforeConversion', params, currentValue);
                        if (beforeUpdateBeforeConvertContent) {
                          await Promise.resolve(beforeUpdateBeforeConvertContent);
                        }

                        // value that is converted if converter is available
                        let processedValue = SettingDecorator
                          .getOrConvertedValue(currentValue, params, 'modelConversion');

                        // after conversion, it is new object, so will not affect what's currently displayed
                        //TODO make obj deep copy in case when no converter is called
                        const beforeUpdateAfterConvertContent = settingsDecoratorContext
                          .callbacksRunner('executeBeforeStoreAfterConversion', params, processedValue);
                        if (beforeUpdateAfterConvertContent) {
                          await Promise.resolve(beforeUpdateAfterConvertContent);
                        }

                        settingsDecoratorContext.getStoreService(params)
                            .save(settingKey, processedValue)
                            .then((result : any) => {
                              // save process finished
                              EventsUtil.getSettingsSavedEmiter().emit(false);
                            });
                            //TODO scenarions for unsucessfull settings save
                      }
                    }
                  },
                  configurable: true
                })

                this.callbacksRunner(
                  'executeAfterAll', params, (currentValue === undefined || currentValue === null) ? fieldValue : currentValue);

            })
            .catch((error : any) => {
                console.log(error);
            });

    }

    private callbacksRunner<T extends SettingDecoratorParameters>(callbackName: keyof T, params: T, args: any) : any {
      if (params[callbackName] && typeof params[callbackName] === 'function') {
        if (!Array.isArray(args)) {
          args = [args];
        }
        console.log("Running callback: " + callbackName.toString() + ", with parameters: " + args);
        return (params[callbackName] as Function).apply(this, args);
      }
      return null;
    }

    private getStoreService(params : SettingDecoratorParameters) : StoreAllService {
        return params.localOnly ? SettingDecorator.localStoreService : SettingDecorator.syncStoreService;
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
        return converter.call(converters, valueToConvert);
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
