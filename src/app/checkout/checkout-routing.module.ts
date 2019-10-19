import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";

import { CheckoutComponent } from "./containers/checkout/checkout.component";

const checkoutRoutes: Routes = [
    { path: "checkout", component: CheckoutComponent }
];

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forChild(checkoutRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class CheckoutRoutingModule { }
