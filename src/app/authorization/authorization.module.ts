import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { LoginComponent } from "./containers/login/login.component";
import { CheckboxComponent } from "./components/checkbox/checkbox.component";
import { HttpClientModule } from "@angular/common/http";
import { authInterceptorsProviders } from "./interceptors";


@NgModule({
    declarations: [
        LoginComponent,
        CheckboxComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule
    ],
    entryComponents: [
        LoginComponent
    ]
})
export class AuthorizationModule {
    static forRoot() {
        return {
            ngModule: AuthorizationModule,
            providers: [
                ...authInterceptorsProviders
            ]
        };
    }
}
