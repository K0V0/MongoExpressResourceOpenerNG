import {EventsUtil} from 'src/app/_base/utils/events.util';
import {Component} from "@angular/core";

// custom imports
import {Setting} from "src/app/_base/decorators/setting/setting.decorator";
import {BaseComponent} from "../base.component";
import {EnviromentUtil, SettingsNames} from './../../../utils/enviroment.util';


// base component for checkbox that allows requests autofire
@Component({
 template: ''
})
export abstract class CheckOnAllEnviromentsBaseComponent extends BaseComponent {

  @Setting({
    storeKey: SettingsNames.CHECK_ON_ALL_ENVIROMENTS,
    defaultValue: EnviromentUtil.getDefaultSetting(SettingsNames.CHECK_ON_ALL_ENVIROMENTS)
  })
  public checkOnAllEnviroments !: boolean;

  change() : void {
    EventsUtil.notifySearchOnAllEnviromentsChanged(this.checkOnAllEnviroments);
  }
}
