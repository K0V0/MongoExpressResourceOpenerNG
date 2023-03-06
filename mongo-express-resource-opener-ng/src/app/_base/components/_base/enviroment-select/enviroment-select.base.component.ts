// angular imports
import { Component } from "@angular/core";

// custom imports
import { BaseComponent } from "../base.component";
import { EnviromentSelectNgModelType } from "./enviroment-select.interfaces";
import { EnviromentSelectSettingDecoratorConverter } from "./enviroment-select.setting.decorator.converter";
import { DefaultValues, EnviromentUtil, SettingsNames } from 'src/app/_base/utils/enviroment.util';
import { Setting } from "src/app/_base/decorators/setting/setting.decorator";


@Component({
  template: ''
})
export abstract class EnviromentSelectBaseComponent extends BaseComponent
{

  @Setting({ 
    defaultValue: EnviromentUtil.getDefaultSetting(SettingsNames.CURRENT_ENVIROMENT),
    storeKey: SettingsNames.CURRENT_ENVIROMENT,
   })
  public currentEnviromentId !: number;

  @Setting({
    defaultValue: EnviromentUtil.getDefaultSetting(SettingsNames.AVAILABLE_ENVIROMENTS),
    storeKey: SettingsNames.ENVIROMENTS,
    converter: new EnviromentSelectSettingDecoratorConverter(),
    onlyDownload: true
  })
  public currentEnviromentsOptions !: EnviromentSelectNgModelType;

}
