import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { map, tap, mergeMap } from "rxjs/operators";
import { CartItem } from "../models/cartItem";
import { Product } from "../models/product";


@Injectable({
  providedIn: "root"
})
export class ProductService {
  constructor(private http: HttpClient) { }

  private basePath = environment.basePath;

  getProducts(page, limit, descriptionLetgth): Observable<{}> {
    const query = new HttpParams();
    query.set("page", page);
    query.set("limit", limit);
    query.set("description_letgth", descriptionLetgth);

    const options = { params: query };
    return this.http.get(`${this.basePath}/products`, options)
        .pipe(
            // tap(console.log)
        );
  }
}
