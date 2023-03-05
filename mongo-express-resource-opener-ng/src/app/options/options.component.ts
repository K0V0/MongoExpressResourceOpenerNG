///<reference types="chrome"/>
// be aware, this weird shit must be first to work in extension mode

// angular imports
import { Component, OnInit, ViewChild } from "@angular/core";

// my imports
import { BaseComponent } from "../_base/components/_base/base.component";
import { EventsUtil } from './../_base/utils/events.util';
import { DataSetsComponent } from './components/data-sets/data-sets.component';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: [
    './options.component.scss'
  ],
})
export class OptionsComponent extends BaseComponent implements OnInit {

  @ViewChild('enviroments')
  private dataSetsComponent !: DataSetsComponent;

  public exitButtonState : boolean = false; // false == can save

  ngOnInit(): void {
    this.handleExitButtonBehaviourDuringSaveOperations();
  }


  public saveAndExit() : void {
    chrome.tabs.getCurrent(function(tab : any) {
        chrome.tabs.remove(tab.id, function() { });
    });
  }

  public addEnviroment() : void {
    this.dataSetsComponent.addEnvitoment();
  }


  private handleExitButtonBehaviourDuringSaveOperations() {
    EventsUtil.getSettingsSavedEmiter().subscribe((state : boolean) => {
      this.exitButtonState = state;
    });
  }
}
