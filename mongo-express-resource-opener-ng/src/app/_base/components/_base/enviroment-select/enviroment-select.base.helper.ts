import { SettingsService } from './../../../services/settings.service';
import { EnviromentSelectBaseComponent } from 'src/app/_base/components/_base/enviroment-select/enviroment-select.base.component';

export class EnviromentSelectBaseHelper {

    protected settingsService : SettingsService;

    protected context : EnviromentSelectBaseComponent;

    constructor(context : EnviromentSelectBaseComponent) {
        this.settingsService = new SettingsService();
        this.context = context;
    } 

    //TODO dorobit po ukladani nastaveni data setvo a prostredi
    public getData(): any {
        var totok = this;
        this.settingsService.getSetting("enviroments").then(result => {
            let data = result['enviroments']
            if (data !== undefined) {
                //TODO konvertovat data
                totok.context.currentEnviromentsOptions = [];
            }
        });
        
    }
    
}