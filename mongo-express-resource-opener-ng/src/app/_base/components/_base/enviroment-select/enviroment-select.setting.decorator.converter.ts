import { SettingDecoratorConverterBase } from "src/app/_base/decorators/setting.decorator";
import { DataSetsStoreType } from "../data-sets/data-sets.interfaces";
import { EnviromentSelectNgModelType, EnviromentSelectStoreType } from "./enviroment-select.interfaces";


export  class EnviromentSelectSettingDecoratorConverter 
        extends SettingDecoratorConverterBase<EnviromentSelectNgModelType, EnviromentSelectStoreType> 
{
    protected mapForNgModel(content: DataSetsStoreType): EnviromentSelectNgModelType {
        return content?.map((x) => ({
            id: x.id,
            name: x.name
        }));
    }

    // no data trasfer from presentation layer to data layer
    protected mapForStore(content: EnviromentSelectNgModelType): DataSetsStoreType {
       return undefined;
    }
}