import { Component, OnInit, OnDestroy } from "@angular/core";
import { Observable } from "rxjs";

import { WindowListenerService } from "src/app/main/services/window-listener.service";

@Component({
    selector: "store-main",
    templateUrl: "./main.component.html",
    styleUrls: ["./main.component.scss"]
})
export class MainComponent implements OnInit, OnDestroy {
    mobileMode: Observable<boolean>;

    constructor(public windowWidthService: WindowListenerService) { }

    ngOnInit() {
        this.windowWidthService.startCheckingWindowWidth();
        this.mobileMode = this.windowWidthService.mobileMode;
    }

    ngOnDestroy() {
        this.windowWidthService.stopCheckingWindowWidth();
    }
}
