import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormBuilder } from "@angular/forms";

@Component({
    selector: "store-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {

    constructor(
        private dialogRef: MatDialogRef<LoginComponent>,
        @Inject(MAT_DIALOG_DATA) private data: { isLogin: number },
        private formBuilder: FormBuilder
    ) {}

    isChecked = false;
    isLogin: number;
    loginPostfix: string;
    loginForm = this.formBuilder.group({
        name: [""],
        email: [""],
        password: [""],
        remember: [""]
    });

    ngOnInit() {
        this.isLogin = this.data.isLogin;
        this.changePostfix(this.isLogin);
    }

    changePostfix(isLogin: number) {
        this.loginPostfix = isLogin === 1 ? "In" : "Up";
    }

    onSubmit() {
        console.log(this.loginForm.value);
    }

    togglePage() {
        this.isLogin = this.isLogin === 1 ? 0 : 1;
        console.log(this.isLogin);
    }

    onClose(): void {
        this.dialogRef.close();
    }
}
