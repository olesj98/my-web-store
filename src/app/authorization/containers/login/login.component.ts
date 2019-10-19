import { Component, Inject, OnInit, OnDestroy, ChangeDetectorRef } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";
import { CustomerService } from "../../services/customer.service";
import { LoginStrategy } from "../../utils/login-strategy.enum";
import { Subscription } from "rxjs";
import { HttpCustomerErorr } from "../../models/error";

@Component({
    selector: "store-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit, OnDestroy {

    constructor(
        private dialogRef: MatDialogRef<LoginComponent>,
        @Inject(MAT_DIALOG_DATA) private data: { isLogin: boolean },
        private formBuilder: FormBuilder,
        private customerService: CustomerService,
        private cd: ChangeDetectorRef
    ) {}

    isLogin: boolean;
    loginPostfix: string;
    loginForm: FormGroup;
    loginSub: Subscription;
    erorrMessage: string;

    ngOnInit() {
        this.isLogin = this.data.isLogin;
        this.changePostfix(this.isLogin);

        this.loginForm = this.formBuilder.group({
            email: [""],
            password: [""],
            remember: [""]
        });

        this.chooseIfAddControl();
    }

    ngOnDestroy(): void {
        if (this.loginSub) {
            this.loginSub.unsubscribe();
        }
    }

    chooseIfAddControl() {
        if (!this.isLogin) {
            this.loginForm.addControl("name", new FormControl(""));
        } else {
            this.loginForm.removeControl("name");
        }
    }

    changePostfix(isLogin: boolean) {
        this.loginPostfix = isLogin ? "In" : "Up";
    }

    onSubmit() {
        // log form value
        console.log(this.loginForm.value);
        if (this.isLogin) {
            // !!!!tut treba subscribe bo majemo obrobyty error i pokazaty!!!!
            this.loginSub = this.customerService.login(this.loginForm.value, LoginStrategy.Regular)
                .subscribe(response => {
                    // dodaty animaciju pidczas zagruzky usera
                    this.closeDialog(response);
                }, (error: HttpCustomerErorr) => {
                    this.setError(error);
                });
        } else {
            this.loginSub = this.customerService.register(this.loginForm.value)
                .subscribe(response => {
                    // dodaty animaciju pidczas zagruzky usera
                    this.closeDialog(response);
                }, (error: HttpCustomerErorr) => {
                    this.setError(error);
                });
        }
    }

    setError(error: HttpCustomerErorr) {
        // console.log(error);
        this.erorrMessage = error.message;
        console.log(this.erorrMessage);
        // dont like it CHANGE DETECTOR???
        this.cd.detectChanges();
        setTimeout(() => this.erorrMessage = "", 2000);
    }

    closeDialog(response) {
        this.dialogRef.close(response);
    }

    togglePage() {
        this.isLogin = !this.isLogin;
        this.chooseIfAddControl();
        this.changePostfix(this.isLogin);
    }

    onClose(): void {
        this.dialogRef.close();
    }
}
