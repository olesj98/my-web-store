import { Component, OnInit, Input } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
import { CartItem } from "../../models/cartItem";
import { CartService } from '../../services/cart.service';

@Component({
    selector: "store-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
    private _toggleInputBoolean = false;
    private _toggleTopBarMenue = false;
    @Input() mobileMode: boolean;
    @Input() darkTheme: boolean;

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
