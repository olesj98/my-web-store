import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { MainModule } from "./main/main.module";
import { AppRoutingModule } from "./app-routing.module";
import { CheckoutModule } from "./checkout/checkout.module";
import { AuthorizationModule } from "./authorization/authorization.module";

import { AppComponent } from "./app.component";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MainModule.forRoot(),
        AuthorizationModule.forRoot(),
        CheckoutModule,
        AppRoutingModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
