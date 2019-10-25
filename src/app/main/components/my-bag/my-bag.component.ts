import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { CartService } from "../../services/cart.service";
import { Observable } from "rxjs";
import { CartItem } from "../../models/cartItem";
import { map, tap } from "rxjs/operators";
import { Router } from "@angular/router";

@Component({
  selector: "store-my-bag",
  templateUrl: "./my-bag.component.html",
  styleUrls: ["./my-bag.component.scss"]
})
export class MyBagComponent implements OnInit {

  constructor(
    private cartService: CartService,
    private dialogRef: MatDialogRef<MyBagComponent>,
    private router: Router
  ) {
    this.isLoadTotalPrice = this.cartService.isLoading$;
  }
  isLoadTotalPrice: Observable<boolean>;

  displayedColumns = ["item", "size", "quantity", "price"];
  cartItems: Observable<CartElement[]> = this.cartService.cartItems$
    .pipe(
      map((cartItems: CartItem[]) => {
        return cartItems.map((cartItem: CartItem) => {
          return {
            item: {
              image: `https://backendapi.turing.com/images/products/${cartItem.image}`,
              name: cartItem.name,
              item_id: cartItem.item_id,
              product_id: cartItem.product_id,
              price: cartItem.price
            },
            size: cartItem.attributes,
            quantity: cartItem.quantity,
            price: cartItem.subtotal
          };
        });
      }),
    );

  ngOnInit() {
  }

  closeCart() {
    this.dialogRef.close();
  }

  remoweItem(itemId: number) {
    this.cartService.removeItemFromCart(itemId);
  }

}

export interface CartElement {
  item: {
    image: string;
    name: string;
    item_id: number;
    product_id: number;
    price: string
  };
  size: string;
  quantity: number;
  price: string;
}
