import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { ProductService } from "./product.service";

@Injectable({
  providedIn: "root"
})
export class PaginationService {

  currentPage$: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  croppedPages$: Observable<{number: number, isHidden: boolean}[]>;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private productService: ProductService
  ) {
    this.activatedRoute.queryParams.subscribe((queryParams: Params) => {
          this.currentPage$.next(queryParams.page);
    });
  }

  setPage(value: number) {
    if (this.validateInput(value)) {
      this.changePage(value);
    }
  }

  previousPage() {
    let value = this.currentPage$.getValue();
    this.setPage(--value);
  }
  nextPage() {
    let value = this.currentPage$.getValue();
    this.setPage(++value);
  }

  changePage(page = 1, limit = 10) {
    this.productService.setQueryParam({ page, limit });
  }

  validateInput(value: number): boolean {
    return Number.isInteger(value) ? (value > 0 && value <= this.productService.totalPages$.getValue()) : false;
  }
}
