import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { map, tap, shareReplay, scan, publishReplay, refCount, debounceTime } from "rxjs/operators";
import { CartItem } from "../models/cartItem";
import { ProductService, Product } from "./product.service";

// type CartOperation = (products: CartItem[]) => CartItem[];

@Injectable({
  providedIn: "root"
})
export class CartService {

  constructor(private http: HttpClient, private productService: ProductService) {
    this.cartId = localStorage.getItem("cart_id");
// =======================only frontend================================

    // this.cartProducts$ = this.update$.pipe(
    //   scan((products: CartItem[], operation: CartOperation) => operation(products), []),
    //   tap(console.log),
    //   publishReplay(1),
    //   refCount()
    // );

    // this.addProduct$.pipe(
    //   map((product: CartItem): CartOperation  => {
    //     return (products: CartItem[]) => products.concat(product);
    //   })
    // )
    // .subscribe(this.update$);

    // this.removeProduct$.pipe(
    //   map((itemId: number) => {
    //     return (products: CartItem[]) => products.filter((product: CartItem) => product.item_id !== itemId);
    //   })
    // )
    // .subscribe(this.update$);

    // this.updateProduct$.pipe(
    //   map((options: UpdateOptions) => {
    //     return (products: CartItem[]) => {
    //       const updatingProduct = products.find((product: CartItem) => product.item_id === options.itemId);
    //       const updatingProductIndex = products.indexOf(updatingProduct);
    //       updatingProduct.quantity = options.quantity;
    //       updatingProduct.subtotal = (options.quantity * +updatingProduct.price).toFixed(2);
    //       products[updatingProductIndex] = updatingProduct;
    //       return products;
    //     };
    //   })
    // )
    // .subscribe(this.update$);
// =======================only frontend================================
  }

  private basePath = environment.basePath;
  cartId: string;
  // itemId = 0;

  cartItems$: BehaviorSubject<CartItem[]> = new BehaviorSubject([]);

  _isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading$: Observable<boolean> = this._isLoading$.pipe(tap(console.log), shareReplay(1));
  toggleIsLoading(state: boolean) {
    this._isLoading$.next(state);
  }

// =======================only frontend================================
  // cartProducts$: Observable<CartItem[]>;
  // update$: BehaviorSubject<CartOperation> = new BehaviorSubject<CartOperation>((products: CartItem[]) => products);

  // addProduct$: Subject<CartItem> = new Subject<CartItem>();

  // removeProduct$: Subject<number> = new Subject<number>();

  // updateProduct$: Subject<UpdateOptions> = new Subject<UpdateOptions>();

  // addProduct(productOptions: ProductOptions) {
  //   const products = this.productService.products$.getValue();
  //   const product = products.find((prod: Product) => productOptions.product_id === prod.product_id);
  //   const cartItem = this.mapProductToCartItem(product, productOptions);
  //   this.addProduct$.next(cartItem);
  // }

  // removeProduct(itemId: number) {
  //   this.removeProduct$.next(itemId);
  // }

  // updateProduct(options: UpdateOptions) {
  //   this.updateProduct$.next(options);
  // }
// =======================only frontend================================

  generateCartId() {
    return this.http.get(`${this.basePath}/shoppingcart/generateUniqueId`)
      .pipe(
        tap((cart: { cart_id: string }) => localStorage.setItem("cart_id", cart.cart_id)),
        map((cart: { cart_id: string }) => this.cartId = cart.cart_id),
        shareReplay(1)
      );
  }

  getShopingCart() {
    this.http.get(`${this.basePath}/shoppingcart/${this.cartId}`)
    .pipe(
      tap((cartItems: CartItem[]) => {
        this.cartItems$.next(cartItems);
        this.toggleIsLoading(false);
      }),
      shareReplay(1)
    ).subscribe(null, console.log);
  }

  addItemToCart(product: { cart_id: string, product_id: number, attributes: string }): Observable<CartItem[]> {
    return this.http.post(`${this.basePath}/shoppingcart/add`, product)
      .pipe(
        tap((cartItems: CartItem[]) => {
          this.cartItems$.next(cartItems);
        })
      );
  }

  removeItemFromCart(itemId: number) {
    this.http.delete(`${this.basePath}/shoppingcart/removeProduct/${itemId}`)
      .pipe(
        tap(() => this.getShopingCart())
      )
      .subscribe(null, console.log);
  }

  updateCartItem(quantity: number, itemId: number) {
    return this.http.put(`${this.basePath}/shoppingcart/update/${itemId}`, { quantity })
      .pipe(
        debounceTime(300),
        tap(() => this.getShopingCart())
      )
      .subscribe(null, console.log);
  }

// =======================only frontend style================================
  // mapProductToCartItem(product: Product, productOptions: ProductOptions) {
  //   const cartItem = {
  //     item_id: this.itemId,
  //     name: product.name,
  //     attributes: productOptions.attributes,
  //     product_id: product.product_id,
  //     price: product.price,
  //     quantity: productOptions.quantity,
  //     image: product.thumbnail,
  //     subtotal: product.price,
  //   };
  //   this.increaseItemId();
  //   return cartItem;
  // }

  // increaseItemId() {
  //   this.itemId++;
  // }
// =======================only frontend style================================

}

export interface UpdateOptions {
  quantity: number;
  itemId: number;
}

export interface ProductOptions {
  cart_id: string;
  product_id: number;
  attributes: string;
  quantity: number;
}
