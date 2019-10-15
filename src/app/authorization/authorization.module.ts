import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { LoginComponent } from "./containers/login/login.component";
import { CheckboxComponent } from "./components/checkbox/checkbox.component";


@NgModule({
    declarations: [
        LoginComponent,
        CheckboxComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    entryComponents: [
        LoginComponent
    ]
})
export class AuthorizationModule { }
