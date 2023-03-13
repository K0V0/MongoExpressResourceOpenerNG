///<reference types="chrome"/>

// angular imports
import { Component, OnInit, ViewChild } from "@angular/core";

// my imports
import { EventsUtil } from 'src/app/_base/utils/events.util';
import { BaseComponent } from "../_base/components/_base/base.component";
import { Setting } from '../_base/decorators/setting/setting.decorator';
import { QueryService } from '../_base/services/query.service';
import { QueryServiceImpl } from '../_base/services/query.service.impl';
import { EnviromentUtil, SettingsNames } from '../_base/utils/enviroment.util';
import { ErrorInlineComponent } from './../_base/components/shared/error-inline/error-inline.shared.component';
import { EnviromentSelectComponent } from './components/enviroment-select/enviroment-select.component';
import { ResourceIdComponent } from './components/resource-id/resource-id.component';


// component of extension popup
@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: [
    './popup.component.scss'
  ],
})
export class PopupComponent extends BaseComponent implements OnInit {

  private readonly SETTINGS_URL : string = "index.html#/options";

  @Setting({
    storeKey: SettingsNames.AUTO_SUBMIT_RESOURCE_ID,
    defaultValue: EnviromentUtil.getDefaultSetting(SettingsNames.AUTO_SUBMIT_RESOURCE_ID)
  })
  public autoSubmitEnabled !: boolean;

  @Setting({
    storeKey: SettingsNames.ERASE_AFTER_FIRED_SUCESSFULLY,
    defaultValue: EnviromentUtil.getDefaultSetting(SettingsNames.ERASE_AFTER_FIRED_SUCESSFULLY)
  })
  public clearAfterFired !: boolean;

  @ViewChild('resourceId')
  private resourceIdComponent !: ResourceIdComponent; 

  @ViewChild('resourceError')
  private resourceError !: ErrorInlineComponent;

  private queryService : QueryService;

  public isEnviromentSeletEnabled !: boolean;

  constructor(queryServiceImpl : QueryServiceImpl) {
    super();
    this.queryService = queryServiceImpl;
  }

  ngOnInit(): void {
    this.trackSelectEnviromentAvailability();
    this.trackResourceIdFieldChanges();
  }


  // open settings button action
  public openSettings() : void {
    this.openSettingsPage();
  }

  // submit resource ID button action
  public submit() : void {
    this.findResource();
  }

  // erase input field
  public erase() : void {
    this.resourceIdComponent.resourceId = "";
  }

  // paste anywhere into popup window action
  public paste(event : any) : void {
    if (!this.autoSubmitEnabled) {
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
    this.queryService.open(
      resourceId !== undefined && resourceId.trim().length > 0
        ? resourceId
        : this.resourceIdComponent.resourceId
    )
    .then(() => {
      // ?? cannot find out if this happens because of new tab opened and popup closed
    })
    .catch((error) => {
      this.showResourceIdError(error)
    });
  }

  private showResourceIdError(message : string) : void {
    this.resourceError.message = message;
  }

  private cancelResourceIdError() : void {
    this.resourceError.message = "";
  }

  private trackSelectEnviromentAvailability() : void {
    EventsUtil.getSearchOnAllEnviromentsEmmiter().subscribe((result : boolean) => {
      this.isEnviromentSeletEnabled = !result;
    });
  }

  private trackResourceIdFieldChanges() : void {
    EventsUtil.getResourceIdChangedEmmiter().subscribe(() => {
      this.cancelResourceIdError();
    });
  }

}
