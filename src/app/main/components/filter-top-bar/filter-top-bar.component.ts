import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { ProductService } from "../../services/product.service";
import { Observable } from "rxjs";
import { Category, CategoriesService } from "../../services/categories.service";
import { ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: "store-filter-top-bar",
  templateUrl: "./filter-top-bar.component.html",
  styleUrls: ["./filter-top-bar.component.scss"]
})
export class FilterTopBarComponent implements OnInit {

  categories$: Observable<Category[]>;

  gender: FormControl = new FormControl("");
  color: FormControl = new FormControl("");
  style: FormControl = new FormControl("");
  sortingType: FormControl = new FormControl("");

  constructor(
    private productService: ProductService,
    private categoryService: CategoriesService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.categories$ = this.categoryService.availableCategories$;

    this.activatedRoute.queryParams.subscribe((query: Params) => {
      if (!query.category_id) {
        this.style.setValue("");
      }
    });
  }

  changeSelectValueGender() {
// ??
  }
  changeSelectValueStyle() {
// category
    const categoryId = this.style.value.category_id;
    this.productService.setNewFilter({ category_id: categoryId });
  }
  changeSelectValueColor() {
// attribute
  }
  changeSelectValueSortType() {
//  ??
  }
}
