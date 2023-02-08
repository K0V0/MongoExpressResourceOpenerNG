// angular imports
import { Component, OnInit } from "@angular/core";

// custom imports
import { BaseComponent } from "../base.component";
import { AutoSubmitResourceIdComponentIface } from "./auto-submit-resource-id.base.component.interface";

// base component [text field] for ObjectId input of wanted mongo document
@Component({
 template: ''
})

export abstract class AutoSubmitResourceIdBaseComponent 
  extends BaseComponent 
  implements AutoSubmitResourceIdComponentIface, OnInit
{

  public static readonly DATA_ATTR : string = "submitResourceId";

  // must be public because of binding using ngModel
  public isEnabled : boolean; 

  constructor() {
    super();
    this.isEnabled = false;
  }

  getSettings() : any {
    return {};
  }

  // change fires only on user interaction, compared to ngModelChange
  public change() : void {
    console.log(this.isEnabled);
  };

}
