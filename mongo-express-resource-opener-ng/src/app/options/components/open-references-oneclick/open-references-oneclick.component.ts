import {Component} from "@angular/core";
import {BaseComponent} from "../../../_base/components/_base/base.component";
import {Setting} from "../../../_base/decorators/setting/setting.decorator";
import {EnviromentUtil, SettingsNames} from "../../../_base/utils/enviroment.util";

@Component({
  selector: 'component-open-references-oneclick',
  templateUrl: './open-references-oneclick.component.html',
  styleUrls: [
    './../../options.component.scss'
  ]
})
export class OpenReferencesOneclickComponent extends BaseComponent {

  @Setting({
    defaultValue: EnviromentUtil.getDefaultSetting(SettingsNames.OPEN_REFERENCES_ONECLICK),
    storeKey: SettingsNames.OPEN_REFERENCES_ONECLICK,
  })
  public openReferencesOneclick !: boolean;

}
