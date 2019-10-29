import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { map, shareReplay, debounceTime, distinctUntilChanged, tap, switchMap, catchError } from "rxjs/operators";
import { Product } from "../models/product";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { CategoriesService, Category } from "./categories.service";


@Injectable({
  providedIn: "root"
})
export class ProductService {
  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private categoryService: CategoriesService
  ) {

    this.products$ = this._products$.pipe(
      shareReplay(1)
    );

    this.totalProductsAmount$ = this._totalProductsAmount$.pipe(
      shareReplay(1)
    );

// ne treba widpysuwatysia - router sam
    this.activatedRoute.queryParams.subscribe((query: Params) => {
      this.currentQueryParams = { ...query };
      this.pageNumber = +query.page;
      this.pageLimit = +query.limit;
      this.descriptionLetgth = 200;
      this.countViewedProducts();
      if (query.department_id || query.category_id) {
        if (query.department_id && this.departmentId !== +query.department_id) {
          this.departmentId = +query.department_id;
          this.removeQueryParam("category_id");
          this.getDepartmentProducts(this.departmentId)
            .pipe(
              tap(() => this.categoryService.getCategoriesOfDepartment(this.departmentId)),
              tap(this.updateProductsData.bind(this))
            )
            .subscribe(null, console.log);
        }
        if (query.category_id && this.categoryId !== +query.category_id) {
          this.categoryId = +query.category_id;
          this.getCategoryProducts(this.categoryId)
            .pipe(
              tap(this.updateProductsData.bind(this))
            )
            .subscribe(null, console.log);
        }
      } else {
        this.categoryService.getAllCategories();
        this.searchProducts()
          .pipe(
            tap(this.updateProductsData.bind(this))
          )
          .subscribe(null, console.log);
      }
    });
  }

  private basePath = environment.basePath;
  pageNumber: number;
  pageLimit: number;
  descriptionLetgth: number;
  departmentId: number;
  categoryId: number;
  currentQueryParams;

  viewedProducts$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  products$: Observable<Product[]>;
  totalProductsAmount$: Observable<number>;
  _products$: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  _totalProductsAmount$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  totalPages$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  isLoadingProducts$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  getProductsOrigin(options: { path: string } = { path: "" }): Observable<any> {
    this.isLoadingProducts$.next(true);
    const defaultPath = `/products`;
    const path = options.path ? options.path : defaultPath;
    const query = { params: {
      page: `${this.pageNumber}`,
      limit: `${this.pageLimit}`,
      description_letgth: `${this.descriptionLetgth}`
    } };
    return this.http.get(`${this.basePath}${path}`, query);
  }

  updateProductsData(productsWrapper: {count: number, rows: Product[]}) {
    this._products$.next(productsWrapper.rows);
    this._totalProductsAmount$.next(productsWrapper.count);
    this.countPages();
    this.isLoadingProducts$.next(false);
  }

  getDepartmentProducts(departmentId: number) {
    const getProductsByDepartmentPath = `/products/inDepartment/${departmentId}`;
    return this.searchProducts({ path: getProductsByDepartmentPath });
  }

  getCategoryProducts(categoryId: number) {
    const getProductsByCategoryPath = `/products/inCategory/${categoryId}`;
    return this.searchProducts({ path: getProductsByCategoryPath });
  }

  searchProducts(options?) {
    return this.getProductsOrigin(options)
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        shareReplay(1),
      );
  }

  countPages() {
    const totalProductAmount = this._totalProductsAmount$.getValue();
    this.totalPages$.next(Math.ceil(totalProductAmount / +this.pageLimit));
  }

  countViewedProducts() {
    this.viewedProducts$.next((this.pageNumber * +this.pageLimit));
  }

  setNewFilter(filterParam) {
    this.setQueryParam({ page: 1, ...filterParam });
  }
  setQueryParam(param: {}) {
    const query = {
      ...this.currentQueryParams,
      ...param
    };
    this.router.navigate(["/store/catalog"], { queryParams: query });
  }
  removeQueryParam(paramKey: string) {
    if (this.currentQueryParams[paramKey]) {
      this.currentQueryParams[paramKey] = undefined;
    }
    const query = {
      ...this.currentQueryParams
    };
    this.router.navigate(["/store/catalog"], { queryParams: query });
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
