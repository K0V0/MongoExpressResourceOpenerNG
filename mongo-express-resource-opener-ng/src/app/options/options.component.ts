///<reference types="chrome"/>

// angular imports
import { Component } from "@angular/core";

// my imports
import { BaseComponent } from "../_base/components/_base/base.component";

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: [
    './options.component.scss'
  ],
})

export class OptionsComponent extends BaseComponent {

  protected getSettings() {
    return {};
  }

  public saveAndExit() : void {
    // save settings
      // TODO
    // close tab
    chrome.tabs.getCurrent(function(tab : any) {
        chrome.tabs.remove(tab.id, function() { });
    });
  }

}
