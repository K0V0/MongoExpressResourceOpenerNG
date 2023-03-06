import { EnviromentUtil } from 'src/app/_base/utils/enviroment.util';
// angular imports
import { Component } from "@angular/core";

// custom imports
import { Setting } from "src/app/_base/decorators/setting/setting.decorator";
import { SettingsNames } from "src/app/_base/utils/enviroment.util";
import { BaseComponent } from "../base.component";


// base component for checkbox that allows requests autofire 
@Component({
 template: ''
})
export abstract class AutoSubmitResourceIdBaseComponent extends BaseComponent {

  @Setting({
    storeKey: SettingsNames.AUTO_SUBMIT_RESOURCE_ID,
    defaultValue: EnviromentUtil.getDefaultSetting(SettingsNames.AUTO_SUBMIT_RESOURCE_ID)
  })
  public isEnabled !: boolean; 
}
