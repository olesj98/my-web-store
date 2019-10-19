import { Component, OnInit } from "@angular/core";
import { WindowListenerService } from "../../services/window-listener.service";
import { Observable } from "rxjs";

@Component({
  selector: "store-store",
  templateUrl: "./store.component.html",
  styleUrls: ["./store.component.scss"]
})
export class StoreComponent implements OnInit {

  constructor(public windowWidthService: WindowListenerService) { }

  mobileMode: Observable<boolean>;

  ngOnInit() {
      this.windowWidthService.startCheckingWindowWidth();
      this.mobileMode = this.windowWidthService.mobileMode;
  }

}
