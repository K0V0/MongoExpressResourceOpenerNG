///<reference types="chrome"/>
// be aware, this weird shit must be first to work in extension mode

// angular imports
import { Component } from "@angular/core";
import { OnInit } from '@angular/core';

// my imports
import { BaseComponent } from "../_base/components/_base/base.component";
import { SettingDecorator } from './../_base/decorators/setting/setting.decorator';


@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: [
    './options.component.scss'
  ],
})
export class OptionsComponent extends BaseComponent implements OnInit {

  public exitButtonState : boolean = false; // false == can save

  ngOnInit(): void {
    this.handleExitButtonBehaviourDuringSaveOperations();
  }


  public saveAndExit() : void {
    chrome.tabs.getCurrent(function(tab : any) {
        chrome.tabs.remove(tab.id, function() { });
    });
  }


  private handleExitButtonBehaviourDuringSaveOperations() {
    SettingDecorator.getSaveEventEmmiter().subscribe((state : boolean) => {
      this.exitButtonState = state;
    });
  }

}
