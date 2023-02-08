// Angular imports
import { Component } from "@angular/core";

// My imports
import { BaseComponent } from "src/app/_base/components/_base/base.component";

@Component({
    selector: 'component-data-sets',
    templateUrl: './data-sets.component.html',
    styleUrls: [
        './data-sets.component.scss',
        './../../options.component.scss'
    ]
})

export class DataSetsComponent extends BaseComponent {

    protected getSettings() {
       return {};
    }

}