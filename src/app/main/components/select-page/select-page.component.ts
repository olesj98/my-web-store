import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { ProductService } from "../../services/product.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ActivatedRoute, Params } from "@angular/router";
import { PaginationService } from "../../services/pagination.service";

@Component({
  selector: "store-select-page",
  templateUrl: "./select-page.component.html",
  styleUrls: ["./select-page.component.scss"]
})
export class SelectPageComponent implements OnInit {
  pageNumber = new FormControl("");
  hideOptions = true;
  pagesNumber$: Observable<number[]>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private paginationService: PaginationService
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe( (value: Params) => {
        this.pageNumber.setValue(value.page);
      }
    );

    this.pagesNumber$ = this.productService.totalPages$
    .pipe(
      map((value: number) => {
        const pageNumbers: number[] = [];
        for (let i = 1; i <= value; i++) {
          pageNumbers.push(i);
        }
        return pageNumbers;
      })
    );
  }

  setInputValue(value: number) {
    this.paginationService.setPage(+value);
  }

  previousPage() {
    this.paginationService.previousPage();
  }

  nextPage() {
    this.paginationService.nextPage();
  }

  toggleOptions(param: boolean) {
    this.hideOptions = param ? param : !this.hideOptions;
  }

}
