import { SettingDecoratorConverter } from "src/app/_base/decorators/setting.decorator";

export class EnviromentSelectSettingDecoratorConverter implements SettingDecoratorConverter {

    storeConversion(content : any) {
        console.log(content)
    }

    modelConversion(content : any) {
        return undefined;
    }

}