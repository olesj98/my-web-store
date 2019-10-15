import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";

import { HomeComponent } from "./containers/home/home.component";
import { CatalogComponent } from "./containers/catalog/catalog.component";
import { DetailComponent } from "./containers/detail/detail.component";
import { BlogComponent } from "./containers/blog/blog.component";
import { MainComponent } from "./containers/main/main.component";

const mainRouts: Routes = [
    { path: "main", component: MainComponent,
        children: [
            { path: "home", component: HomeComponent },
            { path: "catalog", component: CatalogComponent },
            { path: "product/:id", component: DetailComponent },
            { path: "blog", component: BlogComponent }
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
