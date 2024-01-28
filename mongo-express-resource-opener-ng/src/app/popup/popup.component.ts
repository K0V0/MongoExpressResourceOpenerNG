///<reference types="chrome"/>

// angular imports
import {ChangeDetectorRef, Component, OnInit, ViewChild} from "@angular/core";

// my imports
import {EventsUtil} from 'src/app/_base/utils/events.util';
import {BaseComponent} from "../_base/components/_base/base.component";
import {Setting} from '../_base/decorators/setting/setting.decorator';
import {SettingsNames} from '../_base/utils/enviroment.util';
import {ErrorInlineComponent} from './../_base/components/shared/error-inline/error-inline.shared.component';
import {ResourceIdComponent} from './components/resource-id/resource-id.component';
import {BaseUtil} from "../_base/utils/base.util";
import {OpenInNewTabQuery} from "../_base/interfaces/messaging/open-in-new-tab.query";
import {ResourceService} from "../_base/services/resource.service";
import {ResourceServiceImpl} from "../_base/services/resource.service.impl";
import {MessageResponseStatus} from "../_base/interfaces/messaging.interface";


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
    storeKey: SettingsNames.AUTO_SUBMIT_RESOURCE_ID
  })
  public autoSubmitEnabled !: boolean;

  @Setting({
    storeKey: SettingsNames.ERASE_AFTER_FIRED_SUCESSFULLY
  })
  public clearAfterFired !: boolean;

  @Setting({
    storeKey: SettingsNames.CHECK_ON_ALL_ENVIROMENTS
  })
  public isEnviromentSeletDisabled !: boolean;

  @ViewChild('resourceId')
  private resourceIdComponent !: ResourceIdComponent;

  @ViewChild('resourceError')
  private resourceError !: ErrorInlineComponent;

  private resourceService : ResourceService;

  constructor(changeDetectorRef: ChangeDetectorRef, resourceService: ResourceServiceImpl) {
    super();
    this.resourceService = resourceService;
  }

  ngOnInit(): void {
    this.trackSelectEnviromentAvailability();
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
    this.cancelResourceIdError();
  }

  // paste anywhere into popup window action
  public paste(event : any) : void {
    if (!this.autoSubmitEnabled) {
      return;
    }
    let data : string | null | undefined = event.clipboardData?.getData("text/plain");
    if (data) {
      const eventTarget : HTMLElement = event.target as HTMLElement;
      // because otherwise resource id is doubled when pasted directly to the input field
      if (eventTarget.id !== "resourceId") {
        this.resourceIdComponent.resourceId = data;
      }
      this.findResource(data);
    }
  }


  private openSettingsPage() : void {
    if (chrome.runtime.openOptionsPage) {
      chrome.runtime.openOptionsPage();
    } else {
      window.open(chrome.runtime.getURL(this.SETTINGS_URL));
    }
  }

  private findResource(resourceId ?: string | undefined) : void {
    if (resourceId === undefined) {
      resourceId = this.resourceIdComponent.resourceId;
    }
    if (resourceId === undefined) {
      return;
    }

    this.cancelResourceIdError();
    this.resourceService.openInNewTab(resourceId)
      .then(resolve => {
        if (resolve.status === MessageResponseStatus.FAIL) {
          this.showResourceIdError(resolve.data);
        } else {
          this.cancelResourceIdError();
          if (this.clearAfterFired) {
            this.erase();
          }
          BaseUtil.sendMessage(new OpenInNewTabQuery(resolve.data));
        }
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
      this.isEnviromentSeletDisabled = result;
    });
  }

}
