import {Component} from "@angular/core";
import {BaseComponent} from "../../../_base/components/_base/base.component";
import {Setting} from "../../../_base/decorators/setting/setting.decorator";
import {SettingsNames} from "../../../_base/utils/enviroment.util";
import {
  DocumentIdSetupNgModelType
} from "../../../_base/components/_base/document-id-setup/document-id-setup.interfaces";
import {DocumentIdSetupSettingDecoratorConverter} from "./document-id-setup.settings.decorator.converter";

@Component({
  selector: 'component-document-id-setup',
  templateUrl: './document-id-setup.component.html',
  styleUrls: [
    './../../options.component.scss'
  ]
})
export class DocumentIdSetupComponent extends BaseComponent {

  @Setting({
    storeKey: SettingsNames.DOCUMENT_ID_OBJECTS,
    converter: new DocumentIdSetupSettingDecoratorConverter()
  })
  public idProperties !: DocumentIdSetupNgModelType;

  public change() : void {

  }
}
