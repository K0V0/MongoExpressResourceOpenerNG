// angular imports
import { Component } from "@angular/core";
import { OnInit } from '@angular/core';
import { Setting } from "src/app/_base/decorators/setting.decorator";

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

  @Setting({ defaultValue: "enviroment_0" })
  public currentEnviromentId! : string;

  @Setting({ defaultValue: [{ id: "enviroment_0", name: "Základné prostredie" }] })
  public currentEnviromentsOptions! : any;
  
  constructor() {
    super();
    this.helper = new EnviromentSelectBaseHelper(this);
  }

  ngOnInit(): void {
    this.helper.getData();
  }

  //TODO do iface
  public change() : void {

  }

}
