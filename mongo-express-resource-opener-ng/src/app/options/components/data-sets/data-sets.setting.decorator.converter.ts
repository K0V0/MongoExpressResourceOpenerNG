import {DataSetsNgModelType} from 'src/app/_base/components/_base/data-sets/data-sets.interfaces';
import {SettingDecoratorConverterBase} from 'src/app/_base/decorators/setting/setting.decorator.converter';
import {DataSetsStoreType} from './../../../_base/components/_base/data-sets/data-sets.interfaces';


export  class DataSetsSettingDecoratorConverter
        extends SettingDecoratorConverterBase<DataSetsNgModelType, DataSetsStoreType>
{
  private static readonly SEPARATOR : string = "\n";

  protected mapForNgModel(content: DataSetsStoreType) : DataSetsNgModelType {
      return content?.map((x) => ({
          id: x.id,
          name: x.name,
          datasets: x.datasets?.join(DataSetsSettingDecoratorConverter.SEPARATOR),
          useLogin: x.useLogin,
          useLoginDefault: x.useLoginDefault,
          username: x.usernameHash,
          pass: x.passHash
      }));
  }

  protected mapForStore(content: DataSetsNgModelType) : DataSetsStoreType {
      return content?.map((x) => ({
          id: x.id,
          name: x.name,
          datasets: x.datasets?.trim().split(DataSetsSettingDecoratorConverter.SEPARATOR)
            .map((x) => x.trim())
            .filter((x) => x.length > 0),
          useLogin: x.useLogin,
          useLoginDefault: x.useLoginDefault,
          usernameHash: x.username,
          passHash: x.pass
      }));
  }
}
