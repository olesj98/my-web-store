import { Component, OnInit } from "@angular/core";
import { ProductService } from "../../services/product.service";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';

@Component({
    selector: "store-catalog",
    templateUrl: "./catalog.component.html",
    styleUrls: ["./catalog.component.scss"]
})
export class CatalogComponent implements OnInit {

    products: Observable<any>;

    constructor(
        private productService: ProductService
    ) { }

    ngOnInit() {
        this.products = this.productService.getProducts(1, 20, 220)
            .pipe(
                map( (productsData: { rows: []} ) => productsData.rows)
            );
    }

}
