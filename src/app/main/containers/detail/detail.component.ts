import { Component, OnInit } from "@angular/core";
import { Params, ActivatedRoute } from "@angular/router";

@Component({
    selector: "store-detail",
    templateUrl: "./detail.component.html",
    styleUrls: ["./detail.component.scss"]
})
export class DetailComponent implements OnInit {

    constructor(private route: ActivatedRoute) {
        this.routeParameter = this.route.snapshot.paramMap.get("id");
    }
    routeParameter: string;

    ngOnInit() {
    }

}
