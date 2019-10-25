import { Component, OnInit } from "@angular/core";
import { ProductService } from "../../services/product.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { CartService } from "../../services/cart.service";

@Component({
    selector: "store-catalog",
    templateUrl: "./catalog.component.html",
    styleUrls: ["./catalog.component.scss"]
})
export class CatalogComponent implements OnInit {

    products$: Observable<any>;
    isLoadingProducts: boolean;

    constructor(
        private productService: ProductService,
    ) { }

    ngOnInit() {
        this.products$ = this.productService.products$;
        this.productService.isLoadingProducts$
            .subscribe((value: boolean) => this.isLoadingProducts = value );
    }

}
