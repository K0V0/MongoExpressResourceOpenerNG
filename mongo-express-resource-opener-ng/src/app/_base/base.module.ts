// My imports
import { Constants } from './utils/constants.util';
import { StoreService } from './services/store.service';
import { SettingsService } from './services/settings.service';

// Angular imports
import { NgModule } from "@angular/core";

@NgModule({
    imports: [
    ],
    declarations: [
    ],
    exports: [
        Constants,
        StoreService,
        SettingsService
    ],
    providers: [
    ]
})

export class BaseModule { }