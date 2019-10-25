import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { ProductService } from "../../services/product.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { DepartmentsService, Department } from "../../services/departments.service";

@Component({
  selector: "store-pagination",
  templateUrl: "./pagination.component.html",
  styleUrls: ["./pagination.component.scss"]
})
export class PaginationComponent implements OnInit {

  filterBy: FormControl;
  totalProductsAmount$: Observable<number>;
  viewedProducts$: Observable<number>;
  sortByOptions$: Observable<Department[]>;

  constructor(
    private productService: ProductService,
    private departmentService: DepartmentsService,
    ) {
    this.filterBy = new FormControl("");
    this.totalProductsAmount$ = this.productService.totalProductsAmount$;
  }

  changeSortingType() {
    // console.log(this.filterBy.value);
  }

  ngOnInit() {
    this.viewedProducts$ = this.productService.viewedProducts$;
    this.departmentService.getDepartments();
    this.sortByOptions$ = this.departmentService.departments$;
  }

}
