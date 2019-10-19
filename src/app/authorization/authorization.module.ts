import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { LoginComponent } from "./containers/login/login.component";
import { CheckboxComponent } from "./components/checkbox/checkbox.component";
import { HttpClientModule } from "@angular/common/http";
import { authInterceptorsProviders } from "./interceptors";
import { FacebookBtnComponent } from "./components/facebook-btn/facebook-btn.component";


@NgModule({
    declarations: [
        LoginComponent,
        CheckboxComponent,
        FacebookBtnComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule
    ],
    entryComponents: [
        LoginComponent
    ],
    // schemas: [ CUSTOM_ELEMENTS_SCHEMA ] - only for custom tags
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
