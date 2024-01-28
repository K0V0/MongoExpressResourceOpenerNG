import {DataSetsNgModelType} from 'src/app/_base/components/_base/data-sets/data-sets.interfaces';
import {SettingDecoratorConverterBase} from 'src/app/_base/decorators/setting/setting.decorator.converter';
import {DataSetsStoreType} from './../../../_base/components/_base/data-sets/data-sets.interfaces';
import {CryptogrServiceImpl} from "../../../_base/services/cryptogr.service.impl";


export  class DataSetsSettingDecoratorConverter
        extends SettingDecoratorConverterBase<DataSetsNgModelType, DataSetsStoreType>
{
  private static readonly SEPARATOR : string = "\n";
  private secureKey : string = "";

  public setSecureKey(secureKey : string) : void {
    this.secureKey = secureKey;
  }

  public getSecureKey() : string {
    return this.secureKey;
  }

  protected mapForNgModel(content: DataSetsStoreType) : DataSetsNgModelType {
      return content?.map((x) => ({
          id: x.id,
          name: x.name,
          datasets: x.datasets?.join(DataSetsSettingDecoratorConverter.SEPARATOR),
          useLogin: x.useLogin,
          useLoginDefault: x.useLoginDefault,
          //username: CryptogrServiceImpl.decrypt(x.usernameHash, this.secureKey),
          username: x.usernameHash,
          //pass: CryptogrServiceImpl.decrypt(x.passHash, this.secureKey)
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
          //usernameHash: CryptogrServiceImpl.encrypt(x.username, this.secureKey),
          usernameHash: x.username,
          //passHash: CryptogrServiceImpl.encrypt(x.pass, this.secureKey)
          passHash: x.pass
      }));
  }
}
