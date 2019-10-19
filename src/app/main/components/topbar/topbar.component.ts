import { Component, OnInit } from "@angular/core";
import { CartItem } from "../../models/cartItem";
import { Observable } from "rxjs";

@Component({
  selector: "store-topbar",
  templateUrl: "./topbar.component.html",
  styleUrls: ["./topbar.component.scss"]
})
export class TopbarComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }

}
