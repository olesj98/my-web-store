import { Component, OnInit, ViewChild, ElementRef, OnDestroy, Input } from "@angular/core";
import { WindowListenerService } from "../../services/window-listener.service";
import { Subscription, Observable } from "rxjs";

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
    private _toggleInputBoolean = false;
    private _toggleTopBarMenue = false;
    itemsNumber = 0;
    @Input() mobileMode: boolean;

    constructor() { }

    ngOnInit() {
        console.log(this.mobileMode);
    }

    toggleSearchInput() {
        this._toggleInputBoolean = !this._toggleInputBoolean;
    }

    unfocusSearchInput() {
        this._toggleInputBoolean = false;
    }

    toggleTopBarMenue() {
        this._toggleTopBarMenue = !this._toggleTopBarMenue;
    }

    stopPropagate(event: Event) {
        event.stopPropagation();
    }

}
