import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { FormControl } from "@angular/forms";
import { CartElement } from "../my-bag/my-bag.component";
import { CartItem } from "../../models/cartItem";
import { CartService } from "../../services/cart.service";

@Component({
  selector: "store-cart-item-quantity",
  templateUrl: "./cart-item-quantity.component.html",
  styleUrls: ["./cart-item-quantity.component.scss"]
})
export class CartItemQuantityComponent implements OnInit {
  @Input() cartItem: CartElement;
  item: CartElement;
  itemNumberInput: FormControl;
  quantity: number;

  constructor(
    private cartService: CartService
  ) { }

  ngOnInit() {
    this.item = JSON.parse(JSON.stringify(this.cartItem));
    this.quantity = this.item.quantity;
    this.itemNumberInput = new FormControl(this.quantity);
  }

  changeQuantity(): void {
    this.quantity = this.itemNumberInput.value;
    this.upDateCartItems(this.quantity);
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
      this.upDateCartItems(this.quantity);
    }
  }

  increaseQuantity(): void {
    this.quantity++;
    this.upDateCartItems(this.quantity);
  }

  upDateCartItems(quantity: number): void {
    this.cartService.updateCartItem(quantity, this.item.item.item_id);
    this.cartService.toggleIsLoading(true);
  }

}
