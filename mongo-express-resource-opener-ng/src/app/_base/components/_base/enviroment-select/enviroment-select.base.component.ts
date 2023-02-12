// angular imports
import { Component } from "@angular/core";
import { OnInit } from '@angular/core';

// custom imports
import { BaseComponent } from "../base.component";
import { EnviromentSelectBaseHelper } from './enviroment-select.base.helper';

@Component({
  template: ''
})

export abstract class EnviromentSelectBaseComponent 
  extends BaseComponent 
  implements OnInit 
{
  private helper : EnviromentSelectBaseHelper;

  public currentEnviromentId : string = "enviroment_0";
  //TODO interface type
  public currentEnviromentsOptions : any =  [
    { id: "enviroment_0", name: "Základné prostredie" }
  ];
  
  constructor() {
    super();
    this.helper = new EnviromentSelectBaseHelper(this);
  }

  propsToSyncWithStore() : any {
    return ["currentEnviromentId"];
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.helper.getData();
  }

}
