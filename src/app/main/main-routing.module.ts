import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";

import { HomeComponent } from "./containers/home/home.component";
import { CatalogComponent } from "./containers/catalog/catalog.component";
import { DetailComponent } from "./containers/detail/detail.component";
import { BlogComponent } from "./containers/blog/blog.component";
import { MainComponent } from "./containers/main/main.component";
import { StoreComponent } from "./containers/store/store.component";

const mainRouts: Routes = [
    { path: "main" , redirectTo: "/main/home", pathMatch: "full" },
    { path: "main", component: MainComponent,
        children: [
            { path: "home", component: HomeComponent },
            { path: "blog", component: BlogComponent }
        ]
    },
    { path: "store" , redirectTo: "/store/catalog", pathMatch: "full" },
    { path: "store", component: StoreComponent,
        children: [
            { path: "catalog", component: CatalogComponent },
            { path: "product/:id", component: DetailComponent },
        ]
    }
];

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forChild(mainRouts)
    ],
    exports: [
        RouterModule
    ]
})
export class MainRoutingModule { }
