import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { tap, mergeMap, reduce, switchMap, map } from "rxjs/operators";
import { Observable, from } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AttributesService {

  constructor(
    private http: HttpClient
  ) {
  }

  private basePath = environment.basePath;

  getAttributesForProduct(productId): Observable<any> {
    return this.http.get(`${this.basePath}/attributes/inProduct/${productId}`)
      .pipe(
        tap(console.log)
      );
  }

  getAttributesList() {
    return this.http.get(`${this.basePath}/attributes`)
    .pipe(
      switchMap((attrs: {attribute_id: number, name: string}[]) => {
        return from(attrs)
          .pipe(
            mergeMap((attr: {attribute_id: number, name: string} ) => {
              return this.http.get(`${this.basePath}/attributes/values/${attr.attribute_id}`)
                .pipe(
                  map((attrValues) => ({...attr, values: attrValues}))
                );
            })
          );
      }),
      reduce((acc: {attribute_id: number, name: string}[], attr: {attribute_id: number, name: string}) => {
        acc.push(attr);
        return acc;
      }, []),
      tap(console.log),
    ).subscribe((attrs) => {
    });
  }

}
