// angular imports
import { Component } from "@angular/core";

// custom imports
import { BaseComponent } from "../base.component";

// base component [text field] for ObjectId input of wanted mongo document
@Component({
  selector: 'component-select-enviroment-base',
  templateUrl: './enviroment-select.base.component.html',
  styleUrls: [
     './enviroment-select.base.component.scss'
  ]
})

export abstract class EnviromentSelectBaseComponent extends BaseComponent {

  public static readonly DATA_ATTR : string = "enviromentId";

}
