import {Component} from "@angular/core";
import {Setting} from "src/app/_base/decorators/setting/setting.decorator";
import {EnviromentUtil, SettingsNames} from "src/app/_base/utils/enviroment.util";
import {BaseComponent} from "../base.component";

@Component({
    template: ''
})
export abstract class ClearAfterFiredBaseComponent extends BaseComponent {

    @Setting({
        storeKey: SettingsNames.ERASE_AFTER_FIRED_SUCESSFULLY,
        defaultValue: EnviromentUtil.getDefaultSetting(SettingsNames.ERASE_AFTER_FIRED_SUCESSFULLY)
    })
    public clearAfterFired !: boolean;
}
