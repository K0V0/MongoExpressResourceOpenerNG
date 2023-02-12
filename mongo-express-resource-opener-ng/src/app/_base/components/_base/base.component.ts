import { Component } from "@angular/core";
import { SettingsService } from './../../services/settings.service';

@Component({
    template: ''
})

export abstract class BaseComponent {

    protected settingsService : SettingsService;

    constructor() {
        this.settingsService = new SettingsService();
    }

    //TODO iface
    protected abstract propsToSyncWithStore() : any;

    // initialisation of fields with correct data, mainly on view (page) load
    ngOnInit(): void {
        this.settingsService.init(this, this.propsToSyncWithStore());
        this.settingsService.updateNgModel();
    }

    // change fires only on user interaction, compared to ngModelChange
    // imlement this function into templates as action that You want to run after some data manipulated
    public change() : void {
        this.settingsService.updateStore();
    };
  
}