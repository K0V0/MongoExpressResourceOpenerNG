// Angular imports
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from '@angular/forms';


// My imports
import {AutoSubmitResourceIdComponent} from './components/auto-submit-resource-id/auto-submit-resource-id.component';
import {EnviromentSelectComponent} from './components/enviroment-select/enviroment-select.component';
import {DataSetsComponent} from './components/data-sets/data-sets.component';
import {OptionsComponent} from './options.component';
import {CheckOnAllEnviromentsComponent} from "./components/check-on-all-enviroments/check-on-all-enviroments.component";
import {SecureKeyComponent} from "./components/secure-key/secure-key.component";
import {SharedModule} from "../_base/components/shared/shared.module";
import {ClearAfterFiredComponent} from './components/clear-after-fired/clear-after-fired.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SharedModule
    ],
    declarations: [
        OptionsComponent,
        AutoSubmitResourceIdComponent,
        ClearAfterFiredComponent,
        EnviromentSelectComponent,
        CheckOnAllEnviromentsComponent,
        DataSetsComponent,
        SecureKeyComponent
    ],
    exports: [
        OptionsComponent,
        AutoSubmitResourceIdComponent,
        ClearAfterFiredComponent,
        EnviromentSelectComponent,
        CheckOnAllEnviromentsComponent,
        DataSetsComponent,
        SecureKeyComponent
    ],
    providers: [
    ]
})

export class OptionsModule {}
