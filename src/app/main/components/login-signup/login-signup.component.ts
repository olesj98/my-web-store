import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { LoginComponent } from "../../../authorization/containers/login/login.component";
import { CustomerService } from "../../../authorization/services/customer.service";
import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";

@Component({
    selector: "store-login-signup",
    templateUrl: "./login-signup.component.html",
    styleUrls: ["./login-signup.component.scss"]
    // Dodaty animaciju abo Resolver???
})
export class LoginSignupComponent implements OnInit {
    isLogged: Observable<boolean>;
    user: Observable<string>;

    constructor(
        public dialog: MatDialog,
        public customerService: CustomerService,
    ) { }

    ngOnInit() {
        this.isLogged = this.customerService.isCustomerLogged;
        // correct Observable handling correct and error!!!
        this.user = this.customerService.user
            .pipe(
                map(user => user.name),
                catchError(err => {
                    return of("");
                })
            );
    }

    openModal(isLoginPage: boolean) {
        const dialogRef = this.dialog.open(LoginComponent, {
            panelClass: "dialog-container",
            data: { isLogin: isLoginPage }
        });

        // dialogRef.afterClosed().subscribe(result => {
        //     console.log(result);
        // });
    }

    logOut() {
        this.customerService.logout();
    }

}
