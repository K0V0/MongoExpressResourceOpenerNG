import { EventEmitter } from '@angular/core';
import { DataSetsNgModelType } from 'src/app/_base/components/_base/data-sets/data-sets.interfaces';
import { EnviromentSelectNgModelType } from './../components/_base/enviroment-select/enviroment-select.interfaces';


export class EventsUtil {

    private static readonly SETTINGS_SAVED_EMMITER = new EventEmitter<boolean>();
    private static readonly SETTINGS_ENVIROMENTS_CHANGED = new EventEmitter<EnviromentSelectNgModelType>();
    private static readonly SETTINGS_SEARCH_ON_ALL_ENVIROMENTS_EMMITER = new EventEmitter<boolean>();
    private static readonly RESOURCE_ID_EMMITER = new EventEmitter<void>();


    public static notifySettingsSaved(result : boolean) : void {
        this.SETTINGS_SAVED_EMMITER.emit(result);
    }

    public static notifySearchOnAllEnviromentsChanged(result : boolean) : void {
        this.SETTINGS_SEARCH_ON_ALL_ENVIROMENTS_EMMITER.emit(result);
    }

    public static notifyResourceIdFieldChanged() {
        this.RESOURCE_ID_EMMITER.emit();
    }

    public static getSettingsSavedEmiter() : EventEmitter<boolean> {
        // true emitted - settings saving sequence start
        // false emitted - settings saved
        return this.SETTINGS_SAVED_EMMITER;
    }

    public static getSearchOnAllEnviromentsEmmiter() {
        return this.SETTINGS_SEARCH_ON_ALL_ENVIROMENTS_EMMITER;
    }

    public static getResourceIdChangedEmmiter() {
        return this.RESOURCE_ID_EMMITER;
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