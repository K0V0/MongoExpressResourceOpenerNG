import { DataSetsNgModelType } from 'src/app/_base/components/_base/data-sets/data-sets.interfaces';
import { SettingDecoratorConverterBase } from 'src/app/_base/decorators/setting/setting.decorator.converter';
import { DataSetsStoreType } from './../../../_base/components/_base/data-sets/data-sets.interfaces';


export  class DataSetsSettingDecoratorConverter 
        extends SettingDecoratorConverterBase<DataSetsNgModelType, DataSetsStoreType>
{
    protected mapForNgModel(content: DataSetsStoreType) : DataSetsNgModelType {
        return content?.map((x) => ({
            id: x.id,
            name: x.name,
            datasets: x.datasets.join('\n')
        }));
    }

    protected mapForStore(content: DataSetsNgModelType) : DataSetsStoreType {
        return content?.map((x) => ({
            id: x.id,
            name: x.name,
            datasets: x.datasets.trim().split('\n').map((x) => x.trim())
        }));
    }
}