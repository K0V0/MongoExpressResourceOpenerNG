import { DataSetsHelper } from './data-sets.helper';
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

    private helper : DataSetsHelper;

    // todo vytvorit typovy interface
    public enviroments : any = [
        {
            id: "enviroment_0",
            name: "Základné prostredie",
            datasets: [
                "http://example.com/data"
            ]
        }
    ];

    constructor() {
        super();
        this.helper = new DataSetsHelper(this);
    }

    protected propsToSyncWithStore() : any {
       return [{ enviroments: 'enviroments' }];
    }

}