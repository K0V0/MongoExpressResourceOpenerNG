// angular imports
import { Component } from "@angular/core";

// custom imports
import { CheckOnAllEnviromentsBaseComponent } from "src/app/_base/components/_base/check-on-all-enviroments/check-on-all-enviroments.base.component";

@Component({
  selector: 'component-check-on-all-enviroments',
  templateUrl: './../../../_base/components/_base/check-on-all-enviroments/check-on-all-enviroments.base.component.html',
  styleUrls: [
    './../../options.component.scss'
  ]
})

export class CheckOnAllEnviromentsComponent extends CheckOnAllEnviromentsBaseComponent {
    
}