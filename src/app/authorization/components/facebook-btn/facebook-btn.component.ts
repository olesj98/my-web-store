import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from "@angular/core";
import { CustomerService } from "../../services/customer.service";
import { LoginStrategy } from "../../utils/login-strategy.enum";
import { HttpCustomerErorr } from "../../models/error";

@Component({
    selector: "store-facebook-btn",
    templateUrl: "./facebook-btn.component.html",
    styleUrls: ["./facebook-btn.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FacebookBtnComponent implements OnInit {

    constructor(
        private customerService: CustomerService
        ) { }
    @Output() customerError = new EventEmitter<HttpCustomerErorr>();
    @Output() customerLogged = new EventEmitter();


    ngOnInit() {
    }

    checkLoginState() {
        // jak zrobyty szczob ne kryczalo error na FB???
        FB.login(response => {
            if (response.status === "connected") {
                // error lowymo wid naszogo servisu - czomus ne hocze regaty
                this.customerService.login({ access_token: response.authResponse.accessToken }, LoginStrategy.Facebook)
                    .subscribe(() => {
                        this.customerLogged.emit();
                    },
                    (err) => {
                        this.customerError.emit(err);
                    });
            } else {
                console.log("NOT CONECTED"); // wertaje jakszczo zakryty dialogowe wikno
            }
        });
    }

}
