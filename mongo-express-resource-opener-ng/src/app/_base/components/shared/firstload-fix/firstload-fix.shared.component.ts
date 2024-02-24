import {ChangeDetectorRef, Component, NgZone, OnInit} from "@angular/core";
import {BaseComponent} from "../../_base/base.component";
import {EventsUtil} from "../../../utils/events.util";
import {Setting} from "../../../decorators/setting/setting.decorator";

@Component({
    selector: 'component-firstrun-fix',
    templateUrl: './firstload-fix.shared.component.html'
})
export class FirstloadFixSharedComponent extends BaseComponent implements OnInit {

    private static readonly TIMEOUT_MILIS = 100;

    private zone : NgZone;
    private changeDetectorRef : ChangeDetectorRef;

    @Setting({
        executeAfterAll: () => EventsUtil.notifySettingsLoaded()
    })
    public firstLoad : boolean;

    public constructor(zone : NgZone, changeDetectorRef : ChangeDetectorRef) {
        super();
        this.zone = zone;
        this.changeDetectorRef = changeDetectorRef;
        this.firstLoad = true;
    }

    ngOnInit(): void {
        this.checkSettingsLoaded();
    }

    private checkSettingsLoaded() : void {
        EventsUtil.getSetingsLoadedEmmiter().subscribe(() => {
            setTimeout(() => {
                //this.changeDetectorRef.detectChanges();
                this.zone.run(() => {
                    console.log("Firstload fix applied");
                });
            }, FirstloadFixSharedComponent.TIMEOUT_MILIS);
        });
    }
}
