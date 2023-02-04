// angular imports
import { Component } from "@angular/core";

// my imports
import { BaseComponent } from "../_base/components/_base/base.component";

// component of extension popup
@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: [
    './popup.component.scss'
  ],
})

export class PopupComponent extends BaseComponent {

}
