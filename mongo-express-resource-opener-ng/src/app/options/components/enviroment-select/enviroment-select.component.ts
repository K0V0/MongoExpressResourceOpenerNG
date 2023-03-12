import { OnInit } from '@angular/core';
// Angular imports
import { Component } from "@angular/core";

// My imports
import { EnviromentSelectBaseComponent } from "src/app/_base/components/_base/enviroment-select/enviroment-select.base.component";
import { EnviromentSelectNgModelType } from "src/app/_base/components/_base/enviroment-select/enviroment-select.interfaces";
import { EventsUtil } from "src/app/_base/utils/events.util";

@Component({
  selector: 'component-select-enviroment',
  templateUrl: './../../../_base/components/_base/enviroment-select/enviroment-select.base.component.html',
  styleUrls: [
     './../../options.component.scss'
  ]
})

export class EnviromentSelectComponent extends EnviromentSelectBaseComponent implements OnInit {
  
  ngOnInit(): void {
    this.handleActiveEnviromentDropdownOptionsWhenEnvirometAddedOrRemoved();
  }


  private handleActiveEnviromentDropdownOptionsWhenEnvirometAddedOrRemoved() {
    EventsUtil.getSettingsEnviromentChangedEmiter()
      .subscribe((result : EnviromentSelectNgModelType) => {
        this.currentEnviromentsOptions = result;
      })
  }

}
