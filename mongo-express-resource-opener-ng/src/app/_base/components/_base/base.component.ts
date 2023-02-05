import { Component } from "@angular/core";

@Component({
    selector: 'component-base',
    templateUrl: './base.component.html',
    styleUrls: [
        './base.component.scss'
    ]
})

export abstract class BaseComponent {

    constructor() {}
  
}