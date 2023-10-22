import {Component} from "@angular/core";
import {BaseComponent} from "../../../_base/components/_base/base.component";
import {Setting} from "../../../_base/decorators/setting/setting.decorator";
import {EnviromentUtil, SettingsNames} from "../../../_base/utils/enviroment.util";
import {DataSetsSettingDecoratorConverter} from "../data-sets/data-sets.setting.decorator.converter";

@Component({
  selector: 'component-secure-key',
  templateUrl: './secure-key.component.html',
  styleUrls: [
    './../../options.component.scss'
  ]
})
export class SecureKeyComponent extends BaseComponent {


  @Setting({
    defaultValue: EnviromentUtil.getDefaultSetting(SettingsNames.SECURE_KEY)
  })
  public secureKey !: string;

}
