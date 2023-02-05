// Angular imports
import { NgModule } from "@angular/core";
import { FormsModule } from '@angular/forms';


// My imports
import { AutoSubmitResourceIdComponent } from './components/auto-submit-resource-id/auto-submit-resource-id.component';
import { EnviromentSelectComponent } from './components/enviroment-select/enviroment-select.component';
import { DataSetsComponent } from './components/data-sets/data-sets.component';
import { OptionsComponent } from './options.component';

@NgModule({
    imports: [
        FormsModule
    ],
    declarations: [
        OptionsComponent,
        AutoSubmitResourceIdComponent,
        EnviromentSelectComponent,
        DataSetsComponent
    ],
    exports: [
        OptionsComponent,
        AutoSubmitResourceIdComponent,
        EnviromentSelectComponent,
        DataSetsComponent
    ],
    providers: [
    ]
})

export class OptionsModule {}