import { Component, OnInit, Input, ChangeDetectionStrategy } from "@angular/core";
import { Product } from "../../models/product";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { CartService } from "../../services/cart.service";

@Component({
  selector: "store-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent implements OnInit {
  @Input() products: Observable<Product[]>;

  constructor(
    private cartService: CartService
  ) { }

  ngOnInit() {
    // error handling - return empty array[] !! mozna daty snackbar
    this.products.pipe(
      catchError( err => {
        console.log(err);
        return of([]);
      })
    );
  }

  addToCart(productOptions) {
    this.cartService.addItemToCart(productOptions).subscribe(console.log, console.log);
  }

  trackById(index, product: Product) {
    if (!product) { return null; }
    return product.product_id;
  }

}
