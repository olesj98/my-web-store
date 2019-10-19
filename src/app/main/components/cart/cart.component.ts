import { Component, OnInit, Input, ChangeDetectionStrategy } from "@angular/core";
import { Observable } from "rxjs";
import { CartService } from "../../services/cart.service";
import { map } from "rxjs/operators";
import { MyBagComponent } from "../my-bag/my-bag.component";
import { MatDialog } from "@angular/material/dialog";


@Component({
    selector: "store-cart",
    templateUrl: "./cart.component.html",
    styleUrls: ["./cart.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartComponent {

    constructor(
        private cartService: CartService,
        public dialog: MatDialog
    ) { }

    cartItems = this.cartService.cartItems
        .pipe(
            map( cartItems => cartItems.length)
        );

    openCart() {
        this.dialog.open(MyBagComponent, {
            panelClass: "cart-container"
        });
    }
}
