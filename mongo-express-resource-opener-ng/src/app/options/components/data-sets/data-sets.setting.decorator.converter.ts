import { SettingDecoratorConverter } from 'src/app/_base/decorators/setting.decorator';

interface DataSetsNgModelDataFormat {
    id : string;
    name : string;
    datasets : string;
}

interface DataSetsStoreDataFormat {
    id : string;
    name : string;
    datasets : string[];
}

export class DataSetsSettingDecoratorConverter 
    implements SettingDecoratorConverter<DataSetsNgModelDataFormat[], DataSetsStoreDataFormat[]> 
{
    modelConversion(content : DataSetsNgModelDataFormat[]) : DataSetsStoreDataFormat[] {
        console.log("in model converter");
        console.log(content);

        let result : DataSetsStoreDataFormat[] = [];

        for (let i=0; i<content.length; i++) {
            result[i]['id'] = content[i]['id'];
            result[i]['name'] = content[i]['name'];
            result[i]['datasets'] = content[i]['datasets'].trim().split('\n').map((x) => x.trim());
        }

        console.log(result);

        return result;

    }

    storeConversion(content : DataSetsStoreDataFormat[]) : DataSetsNgModelDataFormat[] {
        console.log("in store converter");

        console.log(content);

        let result : DataSetsNgModelDataFormat[] = [];

        for (let i=0; i<content.length; i++) {
            result[i]['id'] = content[i]['id'];
            result[i]['name'] = content[i]['name'];
            result[i]['datasets'] = content[i]['datasets'].join('\n');
        }

        console.log(result);

        return result;
    }
}