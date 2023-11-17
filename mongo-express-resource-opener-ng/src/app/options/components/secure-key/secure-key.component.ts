import {Component} from "@angular/core";
import {BaseComponent} from "../../../_base/components/_base/base.component";
import {Setting} from "../../../_base/decorators/setting/setting.decorator";
import {EnviromentUtil, SettingsNames} from "../../../_base/utils/enviroment.util";
import {BaseUtil} from "../../../_base/utils/base.util";

@Component({
  selector: 'component-secure-key',
  templateUrl: './secure-key.component.html',
  styleUrls: [
    './../../options.component.scss'
  ]
})
export class SecureKeyComponent extends BaseComponent {


  @Setting({
    localOnly: true,
    storeKey: SettingsNames.SECURE_KEY,
    defaultValue: EnviromentUtil.getDefaultSetting(SettingsNames.SECURE_KEY)
  })
  public secureKey !: string;

  @Setting({
    storeKey: SettingsNames.STORE_MONGO_LOGIN_CREDENTIALS,
    defaultValue: EnviromentUtil.getDefaultSetting(SettingsNames.STORE_MONGO_LOGIN_CREDENTIALS)
  })
  public useLoginCredentialsStorage !: boolean

  credentialsUseEnabledChange() : void {

  }

  onUpdateSecureKey() : void {
    //TODO trigger rehash passwords ?
  }

  generateSecureKey() : void {
    if (!this.secureKey) {
      this.secureKey = BaseUtil.generateRandomString(16);
    }
  }

  copySecureKeyToClipboard() : void {
    const tempElement = document.createElement("textarea");
    tempElement.value = this.secureKey;
    document.body.appendChild(tempElement);
    tempElement.select();
    document.execCommand("copy");
    document.body.removeChild(tempElement);
  }

}
