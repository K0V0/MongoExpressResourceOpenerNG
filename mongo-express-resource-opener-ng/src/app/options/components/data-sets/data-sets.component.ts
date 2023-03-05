// Angular imports
import { Component } from "@angular/core";
import { isEqual } from 'lodash';

// My imports
import { BaseUtil } from './../../../_base/utils/base.util';
import { EventsUtil } from './../../../_base/utils/events.util';
import { BaseComponent } from "src/app/_base/components/_base/base.component";
import { DataSetsNgModelRecordFormat, DataSetsNgModelType } from 'src/app/_base/components/_base/data-sets/data-sets.interfaces';
import { Setting } from 'src/app/_base/decorators/setting/setting.decorator';
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
        converter: new DataSetsSettingDecoratorConverter()
    })
    public enviroments !: DataSetsNgModelType;

    @Setting({
        defaultValue: [ DataSetsComponent.DEFAULT_VALUE ],
        storeKey: 'enviroments',
        converter: new DataSetsSettingDecoratorConverter(),
        onlyDownload: true, // will not work either for objects
    })
    private enviromentsBefore !: DataSetsNgModelType;

    private timer : any;


    public change() : void {
        this.autosaveEnvs();
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


    private autosaveEnvs() : void {
        if (!isEqual(this.enviromentsBefore, this.enviroments)) {
            let context = this;
            clearTimeout(this.timer);
            this.timer = setTimeout(function() {
                //FIXME hack because decorator's implementation is unable to detect changes 
                // if is object and only attributes are changed
                context.enviroments = BaseUtil.deepClone(context.enviroments);
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
