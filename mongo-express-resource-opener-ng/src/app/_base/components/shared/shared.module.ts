import {NgModule} from "@angular/core";
import {ErrorInlineComponent} from "./error-inline/error-inline.shared.component";
import {FirstloadFixSharedComponent} from "./firstload-fix/firstload-fix.shared.component";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [
        ErrorInlineComponent,
        FirstloadFixSharedComponent
    ],
    exports: [
        ErrorInlineComponent,
        FirstloadFixSharedComponent
    ],
    providers: [
    ]
})

export class SharedModule {}
