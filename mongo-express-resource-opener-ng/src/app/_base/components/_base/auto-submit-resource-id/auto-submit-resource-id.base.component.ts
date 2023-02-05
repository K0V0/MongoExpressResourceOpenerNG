// angular imports
import { Component } from "@angular/core";

// custom imports
import { BaseComponent } from "../base.component";

// base component [text field] for ObjectId input of wanted mongo document
@Component({
  selector: 'component-auto-submit-resource-id-base',
  templateUrl: './auto-submit-resource-id.base.component.html',
  styleUrls: [
     './auto-submit-resource-id.base.component.scss'
  ]
})

export abstract class AutoSubmitResourceIdBaseComponent extends BaseComponent {

  public static readonly DATA_ATTR : string = "submitResourceId";

}
