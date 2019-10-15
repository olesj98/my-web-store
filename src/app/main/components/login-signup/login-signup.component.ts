import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { LoginComponent } from "../../../authorization/containers/login/login.component";
import { isLogin } from "../../../authorization/utils/login.enum";

@Component({
    selector: "store-login-signup",
    templateUrl: "./login-signup.component.html",
    styleUrls: ["./login-signup.component.scss"]
})
export class LoginSignupComponent implements OnInit {
    isLogged = false;
    usename = "Olesj";

    constructor(public dialog: MatDialog) { }

    ngOnInit() {
    }

    openLogIn(): void {
        const dialogRef = this.dialog.open(LoginComponent, {
            panelClass: "dialog-container",
            data: { isLogin: isLogin.Login }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log("The dialog was closed");
        });
    }

    openSignUp() {
        const dialogRef = this.dialog.open(LoginComponent, {
            panelClass: "dialog-container",
            data: { isLogin: isLogin.Signup }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log("The signup was closed");
        });
    }
}
