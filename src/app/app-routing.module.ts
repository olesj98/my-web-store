import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";

import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";

const appRoutes: Routes = [
    { path: "" , redirectTo: "/main/home", pathMatch: "full" }, // redirect to checkout ???
    { path: "checkout", loadChildren: () => import("./checkout/checkout.module").then(mod => mod.CheckoutModule) },
    { path: "**", component: PageNotFoundComponent }
];

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
