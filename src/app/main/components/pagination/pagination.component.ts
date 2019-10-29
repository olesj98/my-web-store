import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { ProductService } from "../../services/product.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { DepartmentsService, Department } from "../../services/departments.service";

@Component({
  selector: "store-pagination",
  templateUrl: "./pagination.component.html",
  styleUrls: ["./pagination.component.scss"]
})
export class PaginationComponent implements OnInit {

  filterBySelect: FormControl;
  totalProductsAmount$: Observable<number>;
  viewedProducts$: Observable<number>;
  options$: Observable<Department[]>;

  constructor(
    private productService: ProductService,
    private departmentService: DepartmentsService
    ) {
    this.filterBySelect = new FormControl("");
    this.totalProductsAmount$ = this.productService.totalProductsAmount$;
  }

  changeSelectValue() {
    const departmentId = this.filterBySelect.value.department_id;
    if (departmentId) {
      // this.productService.removeQueryParam("category_id");
      this.productService.setNewFilter({ department_id: departmentId });
    }
  }

  ngOnInit() {
    this.viewedProducts$ = this.productService.totalProductsAmount$
      .pipe(
        map(totalProductsAmount => this.productService.viewedProducts$.getValue() > totalProductsAmount ?
          totalProductsAmount : this.productService.viewedProducts$.getValue()),
      );
    this.departmentService.getDepartments();
    this.options$ = this.departmentService.departments$;

    if (this.productService.departmentId) {
      this.departmentService.departments$
        .subscribe((departments: Department[]) => {
          const currentDepartment = departments.find((department: Department) =>
            department.department_id === +this.productService.departmentId );
          // select maje pryjmaty object z propsom name!!!!!!!!!!!!!!!!!!!
          this.filterBySelect.setValue(currentDepartment);
        });
    }
  }

}
