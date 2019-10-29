import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class CategoriesService {

  availableCategories$: BehaviorSubject<Category[]> = new BehaviorSubject<Category[]>([]);

  private basePath = environment.basePath;

  constructor(private http: HttpClient) { }

  getCategoriesOfDepartment(departmentId: number): void {
    this.http.get<Category[]>(`${this.basePath}/categories/inDepartment/${departmentId}`)
      .pipe(
        tap((categories: Category[]) => this.availableCategories$.next(categories))
      )
      .subscribe(null, console.log);
  }

  getAllCategories() {
    this.http.get<{count: number, rows: Category[]}>(`${this.basePath}/categories`)
    .pipe(
      tap((categories: {count: number, rows: Category[]}) => this.availableCategories$.next(categories.rows))
    )
    .subscribe(null, console.log);
  }

}

export interface Category {
  category_id: number;
  name: string;
  description: string;
  department_id: string;
}
