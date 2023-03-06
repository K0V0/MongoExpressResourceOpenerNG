// Angular imports
import { Component } from "@angular/core";

// My imports
import { BaseComponent } from "src/app/_base/components/_base/base.component";
import { DataSetsNgModelRecordFormat, DataSetsNgModelType, DataSetsStoreRecordFormat, DataSetsStoreType } from 'src/app/_base/components/_base/data-sets/data-sets.interfaces';
import { Setting } from 'src/app/_base/decorators/setting/setting.decorator';
import { BaseUtil } from './../../../_base/utils/base.util';
import { EnviromentUtil, SettingsNames } from './../../../_base/utils/enviroment.util';
import { EventsUtil } from './../../../_base/utils/events.util';
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

    public static readonly DEFAULT_VALUE : DataSetsStoreType
        = EnviromentUtil.getDefaultSetting(SettingsNames.ENVIROMENTS);

    @Setting({
        defaultValue: DataSetsComponent.DEFAULT_VALUE,
        storeKey: SettingsNames.ENVIROMENTS,
        converter: new DataSetsSettingDecoratorConverter()
    })
    public enviroments !: DataSetsNgModelType;

    @Setting({
        defaultValue: DataSetsComponent.DEFAULT_VALUE,
        storeKey: SettingsNames.ENVIROMENTS,
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
        if (!BaseUtil.deepCompare(this.enviroments, this.enviromentsBefore)) {
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
        let newId : number = (this.enviroments
            ?.map((env) => env.id)
            .reduce((prev, curr) => prev > curr ? prev : curr) ?? 0) + 1;
        let newEnv : DataSetsNgModelRecordFormat = BaseUtil
            .deepClone(DataSetsComponent.DEFAULT_VALUE)
            ?.map((x) => ({
                id: newId,
                name: x.name + "_" + newId ,
                datasets: x.datasets
            }))
            .find((x) => x) as unknown as DataSetsNgModelRecordFormat;
        // appends to current enviromets settings section but do not save to store yet
        this.enviroments?.push(newEnv);
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
