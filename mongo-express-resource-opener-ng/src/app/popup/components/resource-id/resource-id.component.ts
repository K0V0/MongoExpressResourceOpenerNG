// angular imports
import { Component } from "@angular/core";

// my imports
import { ResourceIdBaseComponent } from "src/app/_base/components/_base/resource-id/resource-id.base.component";

@Component({
  selector: 'component-resource-id',
  //templateUrl: '/src/app/_base/components/_base/resource-id/resource-id.base.component.html',
  templateUrl: './resource-id.component.html',
  styleUrls: [
    //  './resource-id.base.component.scss',
     './resource-id.component.scss'
  ]
})

export class ResourceIdComponent extends ResourceIdBaseComponent {

  constructor() {
    super();
  }

  protected onChange(value : string) : void {
    console.log(value);
  }

}
