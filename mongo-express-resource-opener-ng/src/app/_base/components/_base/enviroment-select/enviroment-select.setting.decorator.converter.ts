import { SettingDecoratorConverter } from "src/app/_base/decorators/setting.decorator";

interface EnviromentSelectNgModelDataFormat {
    id : string;
    name : string;
}

export class EnviromentSelectSettingDecoratorConverter 
    implements SettingDecoratorConverter<EnviromentSelectNgModelDataFormat[], any> 
{
    storeConversion(content : any[]) : EnviromentSelectNgModelDataFormat[] {
        console.log("in enviroment select store converter");

        console.log(content);
        
        let result : EnviromentSelectNgModelDataFormat[] = []; 

        for (let i=0; i<content.length; i++) {
            result[i]['id'] = content[i]['id'];
            result[i]['name'] = content[i]['name'];
        }

        console.log(result);

        return result;
    }

    modelConversion(content : EnviromentSelectNgModelDataFormat[]) : any[] | undefined {
        console.log("in enviroment select model converter");
        return undefined;
    }
}