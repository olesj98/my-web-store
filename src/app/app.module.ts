import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { MainModule } from "./main/main.module";
import { AppRoutingModule } from "./app-routing.module";
import { CheckoutModule } from "./checkout/checkout.module";

import { AppComponent } from "./app.component";

@NgModule({
    declarations: [
      AppComponent
    ],
    imports: [
      BrowserModule,
      BrowserAnimationsModule,
      MainModule,
      CheckoutModule,
      AppRoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
