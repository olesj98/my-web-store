import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule } from "@angular/forms";

import { MatDialogModule } from "@angular/material/dialog";
import {MatToolbarModule} from "@angular/material/toolbar";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";

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
import { TopbarComponent } from "./components/topbar/topbar.component";
import { StoreComponent } from "./containers/store/store.component";
import { CartComponent } from "./components/cart/cart.component";
import { ProductListComponent } from "./components/product-list/product-list.component";
import { ProductComponent } from "./components/product/product.component";
import { MyBagComponent } from "./components/my-bag/my-bag.component";
import { CartItemQuantityComponent } from "./components/cart-item-quantity/cart-item-quantity.component";
import { FiltersComponent } from "./components/filters/filters.component";
import { ProductHoverDirective } from "./directives/product-hover.directive";
import { SpinerComponent } from "./components/spiner/spiner.component";
import { PaginationComponent } from "./components/pagination/pagination.component";
import { SelectPageComponent } from "./components/select-page/select-page.component";
import { SlidePageComponent } from "./components/slide-page/slide-page.component";
import { CustomSelectComponent } from "./components/custom-select/custom-select.component";
import { CustomOptionComponent } from "./components/custom-option/custom-option.component";
import { FilterTopBarComponent } from './components/filter-top-bar/filter-top-bar.component';

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
        TopbarComponent,
        StoreComponent,
        CartComponent,
        ProductListComponent,
        ProductComponent,
        MyBagComponent,
        CartItemQuantityComponent,
        FiltersComponent,
        ProductHoverDirective,
        SpinerComponent,
        PaginationComponent,
        SelectPageComponent,
        SlidePageComponent,
        CustomSelectComponent,
        CustomOptionComponent,
        FilterTopBarComponent
    ],
    imports: [
        CommonModule,
        MatDialogModule,
        MatToolbarModule,
        MatCardModule,
        MatButtonModule,
        MatTableModule,
        ReactiveFormsModule,
        FormsModule,
        MainRoutingModule
    ],
    entryComponents: [
        MyBagComponent
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
