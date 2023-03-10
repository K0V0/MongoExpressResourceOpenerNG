import { ClearAfterFiredComponent } from './components/clear-after-fired/clear-after-fired.component';
// Angular imports
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';


// My imports
import { AutoSubmitResourceIdComponent } from './components/auto-submit-resource-id/auto-submit-resource-id.component';
import { EnviromentSelectComponent } from './components/enviroment-select/enviroment-select.component';
import { DataSetsComponent } from './components/data-sets/data-sets.component';
import { OptionsComponent } from './options.component';
import { CheckOnAllEnviromentsComponent } from "./components/check-on-all-enviroments/check-on-all-enviroments.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [
        OptionsComponent,
        AutoSubmitResourceIdComponent,
        ClearAfterFiredComponent,
        EnviromentSelectComponent,
        CheckOnAllEnviromentsComponent,
        DataSetsComponent
    ],
    exports: [
        OptionsComponent,
        AutoSubmitResourceIdComponent,
        ClearAfterFiredComponent,
        EnviromentSelectComponent,
        CheckOnAllEnviromentsComponent,
        DataSetsComponent
    ],
    providers: [
    ]
})

export class OptionsModule {}