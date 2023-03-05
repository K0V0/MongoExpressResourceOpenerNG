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

  @Setting({ defaultValue: 0 })
  public currentEnviromentId! : string;

  @Setting({
    defaultValue: [{ id: 0, name: "Základné prostredie" }],
    storeKey: 'enviroments',
    converter: new EnviromentSelectSettingDecoratorConverter(),
    onlyDownload: true
  })
  public currentEnviromentsOptions !: EnviromentSelectNgModelType;

}
