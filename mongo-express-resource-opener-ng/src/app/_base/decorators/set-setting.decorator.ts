import { StoreService } from "../services/store.service";

export interface SetSettingDecoratorParameters {

}

/**
 *  Sends value into Chrome settings storage if value is changed.
*/
export const SetSetting = (params ?: SetSettingDecoratorParameters) => (target: Object, propertyKey: string) => {
    SetSettingDecorator.getInstance().updateValue(target, propertyKey, params);
}

export class SetSettingDecorator {
    private static instance : SetSettingDecorator;

    private static storeService : StoreService;

    private constructor(storeService : StoreService) {
        SetSettingDecorator.storeService = storeService;
    }

    public static getInstance() : SetSettingDecorator {
        // must be solved that shitty way, because standart dependency injection comes too late
        if (this.instance === undefined) {
            this.instance = new SetSettingDecorator(
                new StoreService()
            )
        }
        return this.instance;
    }

    public updateValue(target : Object, propertyKey : string, params : SetSettingDecoratorParameters | undefined) : void {

        let currentValue : any = Object(target)[propertyKey]; 

        let storeKey : string = target.constructor.name + "-" + propertyKey;

        Object.defineProperty(target, propertyKey, {
            set: function(value) {
                console.log("setSEtting");
                console.log(currentValue);
                console.log(value);
                if (currentValue != value) {
                    currentValue = value;
                    SetSettingDecorator.storeService.save(storeKey, value);
                }
            },
            configurable: true
        })
    }
}