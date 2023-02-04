// angular imports
import { Component } from "@angular/core";

// custom imports
import { BaseComponent } from "../base.component";

// base component [text field] for ObjectId input of wanted mongo document
@Component({
  selector: 'component-resource-id',
  templateUrl: './resource-id.component.html',
  // styleUrls: [
  //   './resource-id.component.scss'
  // ],
})

export abstract class ResourceIdComponent extends BaseComponent {

  public static readonly SELECTOR_ID : string = "resource-id";

  protected abstract onInput() : string | null;

  
}
