import {DataSetsNgModelType} from 'src/app/_base/components/_base/data-sets/data-sets.interfaces';
import {SettingDecoratorConverterBase} from 'src/app/_base/decorators/setting/setting.decorator.converter';
import {DataSetsStoreType} from './../../../_base/components/_base/data-sets/data-sets.interfaces';
import {CryptogrUtil} from "../../../_base/utils/cryptogr.util";


export  class DataSetsSettingDecoratorConverter
        extends SettingDecoratorConverterBase<DataSetsNgModelType, DataSetsStoreType>
{

    private secureKey : string = "";

    public setSecureKey(secureKey : string) : void {
      this.secureKey = secureKey;
    }

    protected mapForNgModel(content: DataSetsStoreType) : DataSetsNgModelType {

      console.log(this.secureKey);

        return content?.map((x) => ({
            id: x.id,
            name: x.name,
            datasets: x.datasets?.join('\n'),
            useLogin: x.useLogin,
            username: CryptogrUtil.decrypt(x.usernameHash, this.secureKey),
            pass: CryptogrUtil.decrypt(x.passHash, this.secureKey)
        }));
    }

    protected mapForStore(content: DataSetsNgModelType) : DataSetsStoreType {

      console.log(this.secureKey);

        return content?.map((x) => ({
            id: x.id,
            name: x.name,
            datasets: x.datasets?.trim().split('\n').map((x) => x.trim()).filter((x) => x.length > 0),
            useLogin: x.useLogin,
            usernameHash: CryptogrUtil.encrypt(x.username, this.secureKey),
            passHash: CryptogrUtil.encrypt(x.pass, this.secureKey)
        }));
    }
}
