import { SettingsNames } from 'src/app/_base/utils/enviroment.util';
// angular imports
import { Component } from "@angular/core";
import { Setting } from "src/app/_base/decorators/setting/setting.decorator";

// custom imports
import { BaseComponent } from "../base.component";
import { EnviromentSelectNgModelType } from "./enviroment-select.interfaces";
import { EnviromentSelectSettingDecoratorConverter } from "./enviroment-select.setting.decorator.converter";


@Component({
  template: ''
})

export abstract class EnviromentSelectBaseComponent extends BaseComponent
{

  @Setting({ 
    defaultValue: 0,
    storeKey: SettingsNames.CURRENT_ENVIROMENT
   })
  public currentEnviromentId! : string;

  @Setting({
    defaultValue: [{ id: 0, name: "Základné prostredie" }],
    storeKey: SettingsNames.AVAILABLE_ENVIROMENTS,
    converter: new EnviromentSelectSettingDecoratorConverter(),
    onlyDownload: true
  })
  public currentEnviromentsOptions !: EnviromentSelectNgModelType;

}
