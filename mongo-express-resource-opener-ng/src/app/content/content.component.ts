// angular imports
import { Component } from "@angular/core";

// my imports
import { BaseComponent } from "../_base/components/_base/base.component";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: [
    './content.component.scss'
  ],
})

export class ContentComponent extends BaseComponent {
  
  protected propsToSyncWithStore(): string[] {
    throw new Error("Method not implemented.");
  }

}
