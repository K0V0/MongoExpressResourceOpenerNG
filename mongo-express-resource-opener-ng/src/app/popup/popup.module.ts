// Angular imports
import { NgModule } from "@angular/core";
import { FormsModule } from '@angular/forms';

// My imports
import { PopupComponent } from './popup.component';
import { ResourceIdComponent } from './components/resource-id/resource-id.component';
import { EnviromentSelectComponent } from './components/enviroment-select/enviroment-select.component';
import { AutoSubmitResourceIdComponent } from './components/auto-submit-resource-id/auto-submit-resource-id.component';

@NgModule({
    imports: [
        FormsModule
    ],
    declarations: [
        ResourceIdComponent,
        EnviromentSelectComponent,
        AutoSubmitResourceIdComponent,
        PopupComponent
    ],
    exports: [
        ResourceIdComponent,
        EnviromentSelectComponent,
        AutoSubmitResourceIdComponent,
        PopupComponent
    ],
    providers: [
    ]
})

export class PopupModule {}