import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { map, tap, mergeMap, shareReplay, debounceTime, distinctUntilChanged } from "rxjs/operators";
import { CartItem } from "../models/cartItem";
import { Product } from "../models/product";


@Injectable({
  providedIn: "root"
})
export class ProductService {
  constructor(private http: HttpClient) {

    this.products$ = this._products$.pipe(
      shareReplay(1)
    );

    this.totalProductsAmount$ = this._totalProductsAmount$.pipe(
      shareReplay(1)
    );
  }

  private basePath = environment.basePath;
  pageNumber: number;
  pageLimit: number;
  descriptionLetgth: number;

  viewedProducts$: BehaviorSubject<number> = new BehaviorSubject<number>(0);


  products$: Observable<Product[]>;
  totalProductsAmount$: Observable<number>;
  _products$: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  _totalProductsAmount$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  totalPages$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  isLoadingProducts$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  getProductsOrigin(pageNumber = 1, pageLimit = 10, descriptionLetgth = 200): Observable<any> {
    this.setPaginationOptions(pageNumber, pageLimit, descriptionLetgth);
    const options = { params: {
      page: `${this.pageNumber}`,
      limit: `${this.pageLimit}`,
      description_letgth: `${this.descriptionLetgth}`
    } };
    this.isLoadingProducts$.next(true);
    return this.http.get(`${this.basePath}/products`, options)
        .pipe(
            map((productsWrapper: {count: number, rows: Product[]}) => {
              this._products$.next(productsWrapper.rows);
              this._totalProductsAmount$.next(productsWrapper.count);
              this.countPages();
              this.isLoadingProducts$.next(false);
              return productsWrapper;
            }),
        );
  }

  searchProducts(page: number) {
    this.getProductsOrigin(page)
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        shareReplay(1)
      )
      .subscribe(null, console.log);
  }

  setPaginationOptions(pageNumber, pageLimit, descriptionLetgth) {
    this.pageLimit = pageLimit;
    this.pageNumber = pageNumber;
    this.descriptionLetgth = descriptionLetgth;
    this.countViewedProducts();
  }

  countPages() {
    const totalProductAmount = this._totalProductsAmount$.getValue();
    this.totalPages$.next(Math.ceil(totalProductAmount / +this.pageLimit));
  }

  countViewedProducts() {
    this.viewedProducts$.next((this.pageNumber * +this.pageLimit));
  }
}

export interface Product {
  product_id: number;
  name: string;
  description: string;
  price: string;
  discounted_price: string;
  thumbnail: string;
}
