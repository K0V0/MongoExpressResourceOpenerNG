import { EventEmitter } from '@angular/core';
import { DataSetsNgModelType } from 'src/app/_base/components/_base/data-sets/data-sets.interfaces';
import { EnviromentSelectNgModelType } from './../components/_base/enviroment-select/enviroment-select.interfaces';


export class EventsUtil {

    private static readonly SETTINGS_SAVED_EMMITER = new EventEmitter<boolean>();
    private static readonly SETTINGS_ENVIROMENTS_CHANGED = new EventEmitter<EnviromentSelectNgModelType>();


    public static notifySettingsSaved(result : boolean) : void {
        this.SETTINGS_SAVED_EMMITER.emit(result);
    }

    public static getSettingsSavedEmiter() : EventEmitter<boolean> {
        // true emitted - settings saving sequence start
        // false emitted - settings saved
        return this.SETTINGS_SAVED_EMMITER;
    }

    public static notifySettingsEnviromentsChanged(result : DataSetsNgModelType) : void {
        this.SETTINGS_ENVIROMENTS_CHANGED.emit(this.convertDataSetsNgModelType(result));
    }

    public static getSettingsEnviromentChangedEmiter() : EventEmitter<EnviromentSelectNgModelType> {
        return this.SETTINGS_ENVIROMENTS_CHANGED;
    }


    private static convertDataSetsNgModelType(content : DataSetsNgModelType) : EnviromentSelectNgModelType {
        return content === undefined 
            ? undefined 
            : content?.map((x) => ({
                id: x.id,
                name: x.name
            }));
    }
}