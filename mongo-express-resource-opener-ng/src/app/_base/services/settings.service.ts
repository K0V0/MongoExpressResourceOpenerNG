import { BaseComponent } from 'src/app/_base/components/_base/base.component';
import { StoreService } from './store.service';

export class SettingsService {

    private storeService : StoreService;

    private context : any;
    private settings : any[] = [];

    constructor() {
        this.storeService = new StoreService();
    }

    public init<CLS extends BaseComponent>(context : CLS, settings : string[]) : void {
        this.context = context;
        this.settings = settings;
    }

    public updateNgModel() : void {
        let totok = this;
        this.iterateOverSettings((storeKey : string, setting : any) => {
            totok.storeService.load(storeKey).then(result => {
                if (result !== undefined) {
                    console.log("--- update ng model");
                    console.log(result[storeKey]);
                    Object(totok.context)[setting] = result[storeKey];
                    console.log(Object(totok.context)[setting]);
                }
            });
        });
    }

    public updateStore() : void {
        let totok = this;
        this.iterateOverSettings((storeKey : string, setting : any) => {
            console.log("--- update store");
            console.log(storeKey);
            console.log(setting);
            this.storeService.save(storeKey, Object(totok.context)[setting]);
        });
    }

    public getSetting(storeKey : string) : Promise<any> {
        return this.storeService.load(storeKey);
    }

    private iterateOverSettings(callback : Function) : void {
        if (this.settings === undefined || this.settings.length == 0) {
            return;
        }
        for (var setting of this.settings) {
            console.log(typeof setting);
            switch (typeof setting) {
                case 'string':
                    callback(this.context.constructor.name + "-" + setting, setting);
                    break;
                case 'object':
                    callback(Object.keys(setting)[0], Object.values(setting)[0]);
                    break;
            }
        }
    }

}