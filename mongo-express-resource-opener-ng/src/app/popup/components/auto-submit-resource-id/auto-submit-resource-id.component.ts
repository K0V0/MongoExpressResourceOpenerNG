// angular imports
import { Component } from "@angular/core";

// custom imports
import { AutoSubmitResourceIdBaseComponent } from "src/app/_base/components/_base/auto-submit-resource-id/auto-submit-resource-id.base.component";

// base component [text field] for ObjectId input of wanted mongo document
@Component({
  selector: 'component-auto-submit-resource-id',
  templateUrl: './auto-submit-resource-id.component.html',
  styleUrls: [
     './auto-submit-resource-id.component.scss'
  ]
})

export class AutoSubmitResourceIdComponent extends AutoSubmitResourceIdBaseComponent {

  

}
