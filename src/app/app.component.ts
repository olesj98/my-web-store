import { Component, OnInit } from "@angular/core";
import { CustomerService } from "./authorization/services/customer.service";
import { HttpErorr } from "./authorization/models/error";

@Component({
    selector: "store-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
    title = "my-web-store";
    constructor(private customerService: CustomerService) { }

    ngOnInit() {
        this.customerService.getUserByToken().subscribe(
            null,
            (err: HttpErorr) => {
                    // mozna snackbar pokazaty - zalogujsia czy wyloguwaty
                    // unauthorized
                    if (err.status === 401) {
                        console.log(err.message);
                    }
                    this.customerService.logout();
            });
    }
}
