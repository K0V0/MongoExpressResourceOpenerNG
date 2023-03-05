// Angular imports
import { Component, EventEmitter, Output } from "@angular/core";
import { isEqual } from 'lodash';

// My imports
import { BaseComponent } from "src/app/_base/components/_base/base.component";
import { DataSetsNgModelType } from 'src/app/_base/components/_base/data-sets/data-sets.interfaces';
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

    @Setting({
        defaultValue: [{
            id: "enviroment_0",
            name: "Základné prostredie",
            datasets: "http://example.com/data"
        }],
        storeKey: 'enviroments',
        converter: new DataSetsSettingDecoratorConverter(),
        onlyDownload: true, // will not work either for objects
    })
    public enviroments !: DataSetsNgModelType;

    @Setting({
        defaultValue: [{
            id: "enviroment_0",
            name: "Základné prostredie",
            datasets: "http://example.com/data"
        }],
        storeKey: 'enviroments',
        converter: new DataSetsSettingDecoratorConverter(),
        onlyDownload: true, // will not work either for objects
    })
    private enviromentsBefore !: DataSetsNgModelType;

    private storeService : StoreService;

    private converter : DataSetsSettingDecoratorConverter;

    private timer : any;

    @Output() 
    savingEvent = new EventEmitter<boolean>();
    
    constructor() {
        super();
        //FIXME dependency injection based on env must exist in angular too
        this.storeService = EnviromentUtil.runningAt() === RuntimeEnviroment.WEB ? new StoreServiceImplDev() : new StoreServiceImplProd();
        this.converter = new DataSetsSettingDecoratorConverter();
    }


    public change() : void {
        this.autosave();
    }

    //FIXME ugly hack because decorator (or more probably me) is unable to detect change
    // when properties of object are changed, whole annotation is useful only for primitive types
    private autosave() : void {
        let areNotOriginal : boolean = !isEqual(this.enviromentsBefore, this.enviroments);

        if (areNotOriginal) {
            let context = this;
            clearTimeout(this.timer);
            this.timer = setTimeout(function() {
                SettingDecorator.getSaveEventEmmiter().emit(true);
                context.storeService.save('enviroments', context.converter.modelConversion(context.enviroments))
                    .then((result : any) => { SettingDecorator.getSaveEventEmmiter().emit(false); });
            }, DataSetsComponent.FIRE_TRESHOLD_MILISECONDS);
        } 
    }
}
