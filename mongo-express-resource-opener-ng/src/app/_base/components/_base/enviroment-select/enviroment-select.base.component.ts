// angular imports
import {Component} from "@angular/core";

// custom imports
import {Setting} from "src/app/_base/decorators/setting/setting.decorator";
import {SettingsNames} from 'src/app/_base/utils/enviroment.util';
import {BaseComponent} from "../base.component";
import {EnviromentSelectNgModelType} from "./enviroment-select.interfaces";
import {EnviromentSelectSettingDecoratorConverter} from "./enviroment-select.setting.decorator.converter";


@Component({
  template: ''
})
export abstract class EnviromentSelectBaseComponent extends BaseComponent
{
  @Setting({
    storeKey: SettingsNames.CURRENT_ENVIROMENT
  })
  public currentEnviromentId !: number;

  @Setting({
    storeKey: SettingsNames.ENVIROMENTS,
    converter: new EnviromentSelectSettingDecoratorConverter(),
    onlyDownload: true
  })
  public currentEnviromentsOptions !: EnviromentSelectNgModelType;

  /**
   *  If the user is able to use this select due to other configuration - enables/disables component
   */
  public isEnabled : boolean = true;
}
