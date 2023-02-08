import { SettingsService } from './../../services/settings.service';
import { Component } from "@angular/core";
import { inject } from '@angular/core';

@Component({
    template: ''
})

export abstract class BaseComponent {

    //protected storeService : StoreService;
    protected settingsService : SettingsService;

    constructor() {
        //this.storeService = inject(StoreService);
        //this.settingsService = inject(SettingsService);
        this.settingsService = new SettingsService();
    }

    // todo type pre json
    protected abstract getSettings() : any;

    ngOnInit(): void {
        this.settingsService.updateNgModel(this, this.getSettings());
    }
  
}