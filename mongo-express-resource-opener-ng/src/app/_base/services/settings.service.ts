import { BaseComponent } from 'src/app/_base/components/_base/base.component';
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class SettingsService {

    public updateNgModel(context : BaseComponent, settings : any) : void{
        console.log(context);
        console.log(settings)
    }

}