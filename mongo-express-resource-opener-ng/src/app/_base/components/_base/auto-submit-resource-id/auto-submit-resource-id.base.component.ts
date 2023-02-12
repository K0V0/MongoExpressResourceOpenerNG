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
  // must be public because of binding using ngModel
  public isEnabled : boolean = false; 

  constructor() {
    super();
  }

  propsToSyncWithStore() : string[] {
    return ["isEnabled"];
  }

}
