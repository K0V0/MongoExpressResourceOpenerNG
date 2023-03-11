import { ErrorInlineComponent } from './../_base/components/shared/error-inline/error-inline.shared.component';
///<reference types="chrome"/>

// angular imports
import { Component, ViewChild } from "@angular/core";

// my imports
import { BaseComponent } from "../_base/components/_base/base.component";
import { QueryServiceImpl } from '../_base/services/query.service.impl';
import { AutoSubmitResourceIdComponent } from './components/auto-submit-resource-id/auto-submit-resource-id.component';
import { QueryService } from '../_base/services/query.service';
import { ResourceIdComponent } from './components/resource-id/resource-id.component';


// component of extension popup
@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: [
    './popup.component.scss'
  ],
})
export class PopupComponent extends BaseComponent {

  private readonly SETTINGS_URL : string = "index.html#/options";

  @ViewChild('resourceId')
  private resourceIdComponent !: ResourceIdComponent; 

  @ViewChild('autoSubmitResourceId')
  private autoSubmitResourceComponent !: AutoSubmitResourceIdComponent;

  @ViewChild('resourceError')
  private resourceError !: ErrorInlineComponent;

  private queryService : QueryService;
  
  constructor(queryServiceImpl : QueryServiceImpl) {
    super();
    this.queryService = queryServiceImpl;
  }


  // open settings button action
  public openSettings() : void {
    this.openSettingsPage();
  }

  // submit resource ID button action
  public submit() : void {
    this.findResource();
  }

  // paste anywhere into popup window action
  public paste(event : any) : void {
    if (!this.autoSubmitResourceComponent.isEnabled) {
      return;
    }
    this.findResource(event.clipboardData.getData("text/plain"));
  }


  private openSettingsPage() : void {
    if (chrome.runtime.openOptionsPage) {
      chrome.runtime.openOptionsPage();
    } else {
      window.open(chrome.runtime.getURL(this.SETTINGS_URL));
    }
  }

  private findResource(resourceId ?: string | undefined) : void {
    this.cancelResourceIdError();
    console.log("findResource()");
    console.log(resourceId); 
    this.queryService.open(
      resourceId !== undefined && resourceId.trim().length > 0
        ? resourceId
        : this.resourceIdComponent.resourceId
    ).catch((error) => {
      this.showResourceIdError(error)
    });
  }

  private showResourceIdError(message : string) : void {
    this.resourceError.message = message;
  }

  //TODO cancel on typing
  private cancelResourceIdError() : void {
    this.resourceError.message = "";
  }

}
