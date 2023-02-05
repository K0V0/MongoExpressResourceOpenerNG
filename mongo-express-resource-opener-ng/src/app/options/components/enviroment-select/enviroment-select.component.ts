// Angular imports
import { Component } from "@angular/core";

// My imports
import { EnviromentSelectBaseComponent } from "src/app/_base/components/_base/enviroment-select/enviroment-select.base.component";

@Component({
  selector: 'component-select-enviroment',
  templateUrl: './../../../_base/components/_base/enviroment-select/enviroment-select.base.component.html',
  styleUrls: [
     './../../../_base/components/_base//enviroment-select/enviroment-select.base.component.scss',
     './../../options.component.scss'
  ]
})

export class EnviromentSelectComponent extends EnviromentSelectBaseComponent {


}
