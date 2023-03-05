import { EventsUtil } from './../../../_base/utils/events.util';
import { BaseUtil } from './../../../_base/utils/base.util';
// Angular imports
import { Component, EventEmitter, Output } from "@angular/core";
import { isEqual } from 'lodash';

// My imports
import { BaseComponent } from "src/app/_base/components/_base/base.component";
import { DataSetsNgModelRecordFormat, DataSetsNgModelType } from 'src/app/_base/components/_base/data-sets/data-sets.interfaces';
import { Setting, SettingDecorator } from 'src/app/_base/decorators/setting/setting.decorator';
import { StoreServiceImplDev } from 'src/app/_base/services/store.service.impl.dev';
import { StoreServiceImplProd } from 'src/app/_base/services/store.service.impl.prod';
import { EnviromentUtil, RuntimeEnviroment } from 'src/app/_base/utils/enviroment.util';
import { StoreService } from './../../../_base/services/store.service';
import { DataSetsSettingDecoratorConverter } from './data-sets.setting.decorator.converter';


@Component({
    selector: 'component-data-sets',
    templateUrl: './data-sets.component.html',
    styleUrls: [
        './data-sets.component.scss',
        './../../options.component.scss'
    ]
})
export class DataSetsComponent extends BaseComponent {

    private static readonly FIRE_TRESHOLD_MILISECONDS : number = 1000;

    public static readonly DEFAULT_VALUE : DataSetsNgModelRecordFormat = {
        id: 0,
        name: "Základné prostredie",
        datasets: "http://example.com/data"
    };

    @Setting({
        defaultValue: [ DataSetsComponent.DEFAULT_VALUE ],
        storeKey: 'enviroments',
        converter: new DataSetsSettingDecoratorConverter(),
        onlyDownload: true, // will not work either for objects
    })
    public enviroments !: DataSetsNgModelType;

    @Setting({
        defaultValue: [ DataSetsComponent.DEFAULT_VALUE ],
        storeKey: 'enviroments',
        converter: new DataSetsSettingDecoratorConverter(),
        onlyDownload: true, // will not work either for objects
    })
    private enviromentsBefore !: DataSetsNgModelType;

    private storeService : StoreService;

    private converter : DataSetsSettingDecoratorConverter;

    private timer : any;

    constructor() {
        super();
        //FIXME dependency injection based on env must exist in angular too
        this.storeService = EnviromentUtil.runningAt() === RuntimeEnviroment.WEB ? new StoreServiceImplDev() : new StoreServiceImplProd();
        this.converter = new DataSetsSettingDecoratorConverter();
    }


    public change() : void {
        this.autosave();
    }

    public addEnvitoment() : void {
        this.createNewEnvArticle();
    }

    public removeEnviroment(event : any) : void {
        this.removeEnvArticle(event.target.value);
    }

    public isLastEnviroment() : boolean {
        return this.enviroments !== undefined && this.enviroments.length < 2;
    }


    //FIXME ugly hack because decorator (or more probably me) is unable to detect change
    // when properties of object are changed, whole annotation is useful only for primitive types
    private autosave() : void {
        if (!isEqual(this.enviromentsBefore, this.enviroments)) {
            let context = this;
            clearTimeout(this.timer);
            this.timer = setTimeout(function() {
                EventsUtil.getSettingsSavedEmiter().emit(true);
                context.storeService.save('enviroments', context.converter.modelConversion(context.enviroments))
                    .then((result : any) => { EventsUtil.getSettingsSavedEmiter().emit(false); });
            }, DataSetsComponent.FIRE_TRESHOLD_MILISECONDS);
        } 
    }

    private createNewEnvArticle() : void {
        let maxId : number | undefined = this.enviroments
            ?.map((env) => env.id)
            .reduce((prev, curr) => prev > curr ? prev : curr);
        let nextEnv = BaseUtil.deepClone(DataSetsComponent.DEFAULT_VALUE);
        nextEnv.id = (maxId === undefined) ? 0 : maxId + 1;
        nextEnv.name += ("_" + nextEnv.id);
        // appends to current enviromets settings section but do not save to store yet
        this.enviroments?.push(nextEnv);
        // update options list in select current enviroment dropdown
        EventsUtil.notifySettingsEnviromentsChanged(this.enviroments);
    }

    private removeEnvArticle(id : number) : void {
        let indexToRemove = this.enviroments?.indexOf(
            this.enviroments?.find((x) => x.id === id) as DataSetsNgModelRecordFormat) ?? -1;
        // removes from settings list
        this.enviroments?.splice(indexToRemove, 1);
        // propagete this change to store
        this.change();
        // update options list in select current enviroment dropdown
        EventsUtil.notifySettingsEnviromentsChanged(this.enviroments);
    };
}
