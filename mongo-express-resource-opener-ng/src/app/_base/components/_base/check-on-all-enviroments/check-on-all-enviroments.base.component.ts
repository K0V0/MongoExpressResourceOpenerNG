import { SettingsNames } from './../../../utils/enviroment.util';
// angular imports
import { Component } from "@angular/core";

// custom imports
import { BaseComponent } from "../base.component";
import { Setting } from "src/app/_base/decorators/setting/setting.decorator";


// base component for checkbox that allows requests autofire 
@Component({
 template: ''
})
export abstract class CheckOnAllEnviromentsBaseComponent extends BaseComponent {

  @Setting({
    storeKey: SettingsNames.CHECK_ON_ALL_ENVIROMENTS
  })
  public checkOnAllEnviroments !: boolean; 
}
