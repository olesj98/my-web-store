import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MatDialogModule } from "@angular/material/dialog";

import { MainRoutingModule } from "./main-routing.module";

import { HomeComponent } from "./containers/home/home.component";
import { FooterComponent } from "./components/footer/footer.component";
import { PageNotFoundComponent } from "../page-not-found/page-not-found.component";
import { CatalogComponent } from "./containers/catalog/catalog.component";
import { DetailComponent } from "./containers/detail/detail.component";
import { BlogComponent } from "./containers/blog/blog.component";
import { MainComponent } from "./containers/main/main.component";
import { HeaderComponent } from "./components/header/header.component";
import { FooterNavComponent } from "./components/footer-nav/footer-nav.component";
import { LoginSignupComponent } from "./components/login-signup/login-signup.component";
import { mainInterceptorProwiders } from "./interceptors";
import { TopbarComponent } from './components/topbar/topbar.component';

@NgModule({
    declarations: [
        HomeComponent,
        FooterComponent,
        PageNotFoundComponent,
        CatalogComponent,
        DetailComponent,
        BlogComponent,
        MainComponent,
        HeaderComponent,
        FooterNavComponent,
        LoginSignupComponent,
        TopbarComponent
    ],
    imports: [
        CommonModule,
        MatDialogModule,
        MainRoutingModule
    ]
})
export class MainModule {
    static forRoot() {
        return {
            ngModule: MainModule,
            providers: [
                ...mainInterceptorProwiders
            ]
        };
    }
}
