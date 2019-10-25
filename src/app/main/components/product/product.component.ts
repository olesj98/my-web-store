import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from "@angular/core";
import { Product } from "../../models/product";
import { CartService } from "../../services/cart.service";
import { AttributesService } from "../../services/attributes.service";
import { Observable } from "rxjs";

@Component({
  selector: "store-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent implements OnInit {
  @Input() product: Product;
  @Output() addProductToCart: EventEmitter<any> = new EventEmitter();
  productImgSrc: string;
  productAttributes: Observable<any>;

  constructor(
    private cartService: CartService,
    private attributesService: AttributesService
  ) { }

  ngOnInit() {
    this.productImgSrc = `https://backendapi.turing.com/images/products/${this.product.thumbnail}`;

    // this.productAttributes = this.attributesService.getAttributesForProduct(this.product.product_id);
  }

  addToCart() {
    const productOptions = {
      cart_id: this.cartService.cartId,
      product_id: this.product.product_id,
      attributes: "L",
      quantity: 1,
    };
    this.addProductToCart.emit(productOptions);
  }

}
