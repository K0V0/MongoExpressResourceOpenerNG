import { SetSettingDecorator, SetSettingDecoratorParameters } from './set-setting.decorator';
import { GetSettingDecorator, GetSettingDecoratorParameters } from './get-setting.decorator';


interface SettingDecoratorParameters extends GetSettingDecoratorParameters, SetSettingDecoratorParameters {
    
}

export const Setting = (params ?: SettingDecoratorParameters) => (target: Object, propertyKey: string) => {
    GetSettingDecorator.getInstance().loadValue(target, propertyKey, params);
    SetSettingDecorator.getInstance().updateValue(target, propertyKey, params);
}