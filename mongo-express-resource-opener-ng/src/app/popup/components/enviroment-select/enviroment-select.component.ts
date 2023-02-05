// angular imports
import { Component } from "@angular/core";

// custom imports
import { EnviromentSelectBaseComponent } from "src/app/_base/components/_base/enviroment-select/enviroment-select.base.component";

// base component [text field] for ObjectId input of wanted mongo document
@Component({
  selector: 'component-select-enviroment',
  templateUrl: './enviroment-select.component.html',
  styleUrls: [
     './enviroment-select.component.scss'
  ]
})

export class EnviromentSelectComponent extends EnviromentSelectBaseComponent {


}
