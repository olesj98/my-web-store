import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: "store-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {

    constructor(private router: Router) { }

    ngOnInit() {
    }

    mooveToCatalog() {
        this.router.navigate(["/store/catalog"], { queryParams: { page: 1, limit: 10 } });
    }

}
