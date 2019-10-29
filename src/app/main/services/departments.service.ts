import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { tap, publishReplay, refCount } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class DepartmentsService {

  departments$: Observable<Department[]>;
  _departments$: Subject<Department[]> = new Subject<Department[]>();

  constructor(private http: HttpClient) {

    this.departments$ = this._departments$.pipe(
      publishReplay(1),
      refCount()
    );

  }

  private basePath = environment.basePath;

  getDepartments(): void {
    this.http.get(`${this.basePath}/departments`)
      .pipe(
        // tap(console.log)
      )
      .subscribe(this._departments$);
  }
}

export interface Department {
  department_id: number;
  name: string;
  description: string;
}
