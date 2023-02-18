// Angular imports
import { Component } from "@angular/core";

// My imports
import { BaseComponent } from "../base.component";
import { ResourceIdComponentIface } from "./resource-id.base.component.interface";

// base component [text field] for ObjectId attribute input of wanted mongo document
@Component({
  template: ''
})

export abstract class ResourceIdBaseComponent extends BaseComponent implements ResourceIdComponentIface {

  private static readonly FIRE_TRESHOLD_MILISECONDS : number = 250;

  //TODO type of JS timer ? 
  private timer : any;

  public resourceId! : string;

  protected abstract onChange(value : string) : void;

  public keyup() : void {
    // eliminates too much requests if typing and "empty keystrokes" like ctrl which fires event when text field has focus
    let context = this;
    clearTimeout(this.timer);
    this.timer = setTimeout(function() {
      if (context.resourceId === undefined || context.resourceId === null || context.resourceId.trim().length <= 0) {
        return;
      }
      context.onChange(context.resourceId.trim());
    }, ResourceIdBaseComponent.FIRE_TRESHOLD_MILISECONDS);
  };

}
