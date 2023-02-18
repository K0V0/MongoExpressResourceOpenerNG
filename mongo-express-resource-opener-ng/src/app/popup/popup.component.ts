///<reference types="chrome"/>

// angular imports
import { Component } from "@angular/core";

// my imports
import { BaseComponent } from "../_base/components/_base/base.component";

// component of extension popup
@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: [
    './popup.component.scss'
  ],
})
export class PopupComponent extends BaseComponent {

  public readonly SETTINGS_URL : string = "index.html#/options";

  // open settings button action
  public openSettings() : void {
    if (chrome.runtime.openOptionsPage) {
        chrome.runtime.openOptionsPage();
    } else {
        window.open(chrome.runtime.getURL(this.SETTINGS_URL));
    }
  }

  // submit resource ID button action
  public submit() : void {
    //TODO
  }

}
