// angular imports
import { Component } from "@angular/core";

// custom imports
import { GetSetting } from "src/app/_base/decorators/get-setting.decorator";
import { Setting } from "src/app/_base/decorators/setting.decorator";
import { BaseComponent } from "../base.component";


@Component({
  template: ''
})
export abstract class EnviromentSelectBaseComponent extends BaseComponent {

  @Setting({ defaultValue: "enviroment_0" })
  public currentEnviromentId! : string;

  @GetSetting({ 
    defaultValue: [{ id: "enviroment_0", name: "Základné prostredie" }],
    storeKey: "enviroments"
    //TODO nastavenia musia prejst adapterom
  })
  public currentEnviromentsOptions! : any;

  public change() : void {

  } 
}
