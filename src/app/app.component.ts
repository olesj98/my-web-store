import { Component, OnInit } from "@angular/core";
import { CustomerService } from "./authorization/services/customer.service";
import { HttpCustomerErorr } from "./authorization/models/error";
import { CartService } from "./main/services/cart.service";

@Component({
    selector: "store-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
    title = "my-web-store";
    constructor(
        private customerService: CustomerService,
        private cartService: CartService
        ) { }

    ngOnInit() {
        // get user if exists
        this.customerService.getUserByToken()
            .subscribe(
                null,
                (err: HttpCustomerErorr) => {
                    this.customerService.logout();
                    localStorage.removeItem("token");
                });

        const cartId = localStorage.getItem("cart_id");
        if (!cartId) {
            this.cartService.generateCartId()
                .subscribe(
                    null,
                    err => console.log(err)
                );
        }

        this.cartService.getShopingCart();
    }
}
