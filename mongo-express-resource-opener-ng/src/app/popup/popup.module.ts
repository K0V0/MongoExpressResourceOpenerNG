// Angular imports
import {CommonModule} from '@angular/common';
import {NgModule} from "@angular/core";
import {FormsModule} from '@angular/forms';

// My imports
import {CheckOnAllEnviromentsComponent} from './components/check-on-all-enviroments/check-on-all-enviroments.component';
import {EnviromentSelectComponent} from './components/enviroment-select/enviroment-select.component';
import {ResourceIdComponent} from './components/resource-id/resource-id.component';
import {PopupComponent} from './popup.component';
import {SharedModule} from "../_base/components/shared/shared.module";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SharedModule
    ],
    declarations: [
        ResourceIdComponent,
        EnviromentSelectComponent,
        CheckOnAllEnviromentsComponent,
        PopupComponent
    ],
    exports: [
        ResourceIdComponent,
        EnviromentSelectComponent,
        CheckOnAllEnviromentsComponent,
        PopupComponent
    ],
    providers: [
    ]
})

export class PopupModule {}
