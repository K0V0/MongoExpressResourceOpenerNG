// angular imports
import { Component } from "@angular/core";

// custom imports
import { BaseComponent } from "../base.component";

// base component [text field] for ObjectId input of wanted mongo document
@Component({
  template: ''
})

export abstract class EnviromentSelectBaseComponent extends BaseComponent {

  public static readonly DATA_ATTR : string = "enviromentId";

  getSettings() : any {
    return {};
  }

}
