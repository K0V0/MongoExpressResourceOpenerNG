// angular imports
import { Component } from "@angular/core";

// custom imports
import { BaseComponent } from "../base.component";
import { Setting } from "src/app/_base/decorators/setting/setting.decorator";


// base component for checkbox that allows requests autofire 
@Component({
 template: ''
})
export abstract class AutoSubmitResourceIdBaseComponent extends BaseComponent {

  @Setting()
  public isEnabled !: boolean; 
}
