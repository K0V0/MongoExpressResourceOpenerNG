// Angular imports
import { Component } from "@angular/core";

// My imports
import { BaseComponent } from "src/app/_base/components/_base/base.component";
import { GetSetting } from 'src/app/_base/decorators/get-setting.decorator';

@Component({
    selector: 'component-data-sets',
    templateUrl: './data-sets.component.html',
    styleUrls: [
        './data-sets.component.scss',
        './../../options.component.scss'
    ]
})

export class DataSetsComponent extends BaseComponent {

    // todo vytvorit typovy interface
    @GetSetting({ 
        defaultValue: [{
            id: "enviroment_0",
            name: "Základné prostredie",
            datasets: [
                "http://example.com/data"
            ]
        }] 
    })
    public enviroments! : any;
}