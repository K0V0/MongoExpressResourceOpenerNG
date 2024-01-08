///<reference types="chrome"/>

// angular imports
import {ChangeDetectorRef, Component, OnInit, ViewChild} from "@angular/core";

// my imports
import {EventsUtil} from 'src/app/_base/utils/events.util';
import {BaseComponent} from "../_base/components/_base/base.component";
import {Setting} from '../_base/decorators/setting/setting.decorator';
import {EnviromentUtil, SettingsNames} from '../_base/utils/enviroment.util';
import {ErrorInlineComponent} from './../_base/components/shared/error-inline/error-inline.shared.component';
import {ResourceIdComponent} from './components/resource-id/resource-id.component';
import {BaseUtil} from "../_base/utils/base.util";
import {OpenInNewTabQuery} from "../_base/interfaces/messaging/open-in-new-tab.query";
import {FindDocumentQuery} from "../_base/interfaces/messaging/find-document.query";
import {FindDocumentMessage} from "../_base/interfaces/messaging.interface";


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

  @Setting({
    storeKey: SettingsNames.CHECK_ON_ALL_ENVIROMENTS,
    defaultValue: EnviromentUtil.getDefaultSetting(SettingsNames.CHECK_ON_ALL_ENVIROMENTS)
  })
  public isEnviromentSeletDisabled !: boolean;

  @ViewChild('resourceId')
  private resourceIdComponent !: ResourceIdComponent;

  @ViewChild('resourceError')
  private resourceError !: ErrorInlineComponent;

  constructor(changeDetectorRef: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
    this.trackSelectEnviromentAvailability();
    //this.trackResourceIdFieldChanges();
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
    let data : string = event.clipboardData.getData("text/plain");
    this.resourceIdComponent.resourceId = data;
    this.findResource(data);
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
    //TODO operácie s messaging API presunúť do services
    const message : FindDocumentMessage = new class implements FindDocumentMessage {
      resourceId = resourceId as string;
    }
    BaseUtil
      .sendMessage(new FindDocumentQuery(message))
      .then(resolve => {
        console.log(resolve);
        this.cancelResourceIdError();
        if (this.clearAfterFired) {
          this.erase();
        }
        BaseUtil.sendMessage(new OpenInNewTabQuery(resolve.data));
      })
      .catch((error) => {
        this.showResourceIdError(error)
      });
    // this.queryService.open(
    //   resourceId !== undefined && resourceId.trim().length > 0
    //     ? resourceId
    //     : this.resourceIdComponent.resourceId
    // )
    // .then(() => {
    //   this.cancelResourceIdError();
    //   if (this.clearAfterFired) {
    //     this.erase();
    //   }
    // })
    // .catch((error) => {
    //   this.showResourceIdError(error)
    // });
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

  //FIXME
  // private trackResourceIdFieldChanges() : void {
  //   EventsUtil.getResourceIdChangedEmmiter().subscribe(() => {
  //     this.cancelResourceIdError();
  //   });
  // }

}
