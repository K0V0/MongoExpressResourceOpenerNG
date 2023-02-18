// angular imports
import { Component } from "@angular/core";

// my imports
import { ResourceIdBaseComponent } from "src/app/_base/components/_base/resource-id/resource-id.base.component";

@Component({
  selector: 'component-resource-id',
  templateUrl: './../../../_base/components/_base/resource-id/resource-id.base.component.html',
  styleUrls: [
     './../../../_base/components/_base/resource-id/resource-id.base.component.scss'
  ]
})

export class ResourceIdComponent extends ResourceIdBaseComponent {

  protected onChange(value : string) : void {
    console.log(value);
    //TODO implementácia
  }

}
