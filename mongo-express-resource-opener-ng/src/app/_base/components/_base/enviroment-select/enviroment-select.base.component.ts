// angular imports
import { Component } from "@angular/core";

// custom imports
import { Setting } from "src/app/_base/decorators/setting.decorator";
import { BaseComponent } from "../base.component";
import { EnviromentSelectSettingDecoratorConverter } from "./enviroment-select.setting.decorator.converter";


@Component({
  template: ''
})

export abstract class EnviromentSelectBaseComponent extends BaseComponent 
{

  @Setting({ defaultValue: "enviroment_0" })
  public currentEnviromentId! : string;

  @Setting({ 
    defaultValue: [{ id: "enviroment_0", name: "Základné prostredie" }],
    storeKey: 'enviroments',
    converter: new EnviromentSelectSettingDecoratorConverter(),
    onlyDownload: true
  })
  public currentEnviromentsOptions! : any[];
  
  //TODO do iface
  public change() : void {

  }
}
