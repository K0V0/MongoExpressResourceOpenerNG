// angular imports
import { Component } from "@angular/core";

// custom imports
import { BaseComponent } from "../base.component";

// base component [text field] for ObjectId input of wanted mongo document
@Component({
  selector: 'component-resource-id-base',
  templateUrl: './resource-id.base.component.html',
  styleUrls: [
     './resource-id.base.component.scss'
  ]
})

export abstract class ResourceIdBaseComponent extends BaseComponent {

  private static readonly FIRE_TRESHOLD : number = 250;
  public static readonly DATA_ATTR : string = "resourceId";

  //TODO type of JS timer ? 
  private timer : any;

  protected abstract onChange(value : string) : void;

  //TODO add type to event
  public resourceChange(event : any) : void {
    let context = this;
    clearTimeout(this.timer);
    this.timer = setTimeout(function() {
      let value : string = event.target.value;
      if (value === undefined || value === null || value.trim().length == 0) {
        return;
      }
      context.onChange(event.target.value.trim());
    }, ResourceIdBaseComponent.FIRE_TRESHOLD);
  };

}
