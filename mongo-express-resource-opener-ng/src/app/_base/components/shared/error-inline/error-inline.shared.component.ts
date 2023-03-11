import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/_base/components/_base/base.component';

@Component({
    selector: 'component-error-inline',
    templateUrl: './error-inline.shared.component.html',
})
export class ErrorInlineComponent extends BaseComponent {
    public message : string = "";

    //TODO pekne animacie a autohide po nejakom case
}