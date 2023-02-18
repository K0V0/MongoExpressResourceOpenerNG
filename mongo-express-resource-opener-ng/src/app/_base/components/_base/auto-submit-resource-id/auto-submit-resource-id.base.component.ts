// angular imports
import { Component } from "@angular/core";

// custom imports
import { Setting } from "src/app/_base/decorators/setting.decorator";
import { BaseComponent } from "../base.component";


// base component for checkbox that allows requests autofire 
@Component({
 template: ''
})
export abstract class AutoSubmitResourceIdBaseComponent extends BaseComponent {

  @Setting()
  public isEnabled! : boolean; 
}
