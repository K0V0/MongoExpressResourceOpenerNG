// angular imports
import { Component } from "@angular/core";
import { GetSetting } from "src/app/_base/decorators/get-setting.decorator";
import { SetSetting } from "src/app/_base/decorators/set-setting.decorator";

// custom imports
import { BaseComponent } from "../base.component";


// base component for checkbox that allows requests autofire 
@Component({
 template: ''
})
export abstract class AutoSubmitResourceIdBaseComponent extends BaseComponent {

  @GetSetting()
  // @SetSetting()
  public isEnabled! : boolean; 
}
