import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { PaginationService } from "../../services/pagination.service";
import { ProductService } from "../../services/product.service";
import { map, tap } from "rxjs/operators";
import { Observable } from "rxjs";

@Component({
  selector: "store-slide-page",
  templateUrl: "./slide-page.component.html",
  styleUrls: ["./slide-page.component.scss"]
})
export class SlidePageComponent implements OnInit {

  currentPage: number;
  croppedPages$: Observable<{number: number, isActive: boolean}[]>;
  totalPages$: Observable<number>;
  pagesType = "first";

  constructor(
    private activatedRoute: ActivatedRoute,
    private paginationService: PaginationService,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams
      .subscribe( (value: Params) => {
          this.currentPage = value.page;
          this.productService.searchProducts(value.page);
        }
      );

    this.croppedPages$ = this.productService.totalPages$
      .pipe(
        map((value: number) => {
          if (value) {
            const pages: {number: number, isActive: boolean}[] = [];
            let croppedPages: {number: number, isActive: boolean}[] = [];
            for (let i = 1; i <= value; i++) {
              pages.push({number: i, isActive: false});
            }
            const currentPage = pages.find(page => page.number === +this.currentPage);
            currentPage.isActive = true;
            const currentPageIndex = pages.indexOf(currentPage);
            if (currentPage.number > pages.length - 4) {
              croppedPages = pages.slice(pages.length - 4, pages.length);
              this.pagesType = "last";
            } else if (currentPage.number < 4) {
              croppedPages = pages.slice(0, 4);
              this.pagesType = "first";
            } else {
              croppedPages = pages.slice(currentPageIndex - 1, currentPageIndex + 2);
              this.pagesType = "middle";
            }
            return croppedPages;
          } else {
            return [];
          }
        })
      );

    this.totalPages$ = this.productService.totalPages$;
  }

  selectPage(value: number | string) {
    value === "first" ? this.paginationService.setPage(1) :
    (value === "last" ? this.paginationService.setPage(this.productService.totalPages$.getValue()) :
    this.paginationService.setPage(+value) );
  }

  previousPage() {
    this.paginationService.previousPage();
  }

  nextPage() {
    this.paginationService.nextPage();
  }

}
