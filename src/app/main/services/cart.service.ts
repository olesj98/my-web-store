import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { map, tap, shareReplay } from "rxjs/operators";
import { CartItem } from "../models/cartItem";

@Injectable({
  providedIn: "root"
})
export class CartService {
  constructor(private http: HttpClient) { }

  private basePath = environment.basePath;
  cartItems: BehaviorSubject<CartItem[]> = new BehaviorSubject([]);
    // .pipe(shareReplay(1)); - ???
  cartId: string;

  generateCartId() {
    return this.http.get(`${this.basePath}/shoppingcart/generateUniqueId`)
      .pipe(
        map((cart: { cart_id: string }) => this.cartId = cart.cart_id),
        shareReplay(1)
      );
  }

  addItemToCart(product: { cart_id: string, product_id: number, attributes: string }): Observable<CartItem[]> {
    return this.http.post(`${this.basePath}/shoppingcart/add`, product)
      .pipe(
        tap((cartItems: CartItem[]) => {
          this.cartItems.next(cartItems);
        })
      );
  }

  getShopingCart(): Observable<{}> {
    return this.http.get(`${this.basePath}/shoppingcart/${this.cartId}`)
    .pipe(
      tap((cartItems: CartItem[]) => {
        this.cartItems.next(cartItems);
      }),
      shareReplay(1)
    );
  }

  removeItemFromCart(itemId: number): Observable<any> {
    return this.http.delete(`${this.basePath}/shoppingcart/removeProduct/${itemId}`)
      .pipe(
        tap(() => this.getShopingCart().subscribe(console.log))
      );
  }

  updateCartItem(quantity: number, itemId: number) {
    return this.http.put(`${this.basePath}/shoppingcart/update/${itemId}`, { quantity })
      .pipe(
        tap(() => this.getShopingCart().subscribe(console.log))
      );
  }

}
