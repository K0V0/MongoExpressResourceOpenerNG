import { ErrorInlineComponent } from './../_base/components/shared/error-inline/error-inline.shared.component';
// Angular imports
import { NgModule } from "@angular/core";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// My imports
import { PopupComponent } from './popup.component';
import { ResourceIdComponent } from './components/resource-id/resource-id.component';
import { EnviromentSelectComponent } from './components/enviroment-select/enviroment-select.component';
import { AutoSubmitResourceIdComponent } from './components/auto-submit-resource-id/auto-submit-resource-id.component';
import { CheckOnAllEnviromentsComponent } from './components/check-on-all-enviroments/check-on-all-enviroments.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
    ],
    declarations: [
        ErrorInlineComponent,
        ResourceIdComponent,
        EnviromentSelectComponent,
        AutoSubmitResourceIdComponent,
        CheckOnAllEnviromentsComponent,
        PopupComponent
    ],
    exports: [
        ResourceIdComponent,
        EnviromentSelectComponent,
        AutoSubmitResourceIdComponent,
        CheckOnAllEnviromentsComponent,
        PopupComponent
    ],
    providers: [
    ]
})

export class PopupModule {}