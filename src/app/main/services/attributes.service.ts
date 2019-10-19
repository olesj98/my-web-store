import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AttributesService {

  constructor(
    private http: HttpClient
  ) { }

  private basePath = environment.basePath;

  getAttributesForProduct(productId): Observable<any> {
    return this.http.get(`${this.basePath}/attributes/inProduct/${productId}`)
      .pipe(
        tap(console.log)
      );
  }
}
