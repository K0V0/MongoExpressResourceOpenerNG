// angular imports
import { Component } from "@angular/core";

// custom imports
import { BaseComponent } from "../base.component";
import { Setting } from "src/app/_base/decorators/setting/setting.decorator";
import { SettingsNames } from "src/app/_base/utils/enviroment.util";


// base component for checkbox that allows requests autofire 
@Component({
 template: ''
})
export abstract class AutoSubmitResourceIdBaseComponent extends BaseComponent {

  @Setting({
    storeKey: SettingsNames.AUTO_SUBMIT_RESOURCE_ID
  })
  public isEnabled !: boolean; 
}
