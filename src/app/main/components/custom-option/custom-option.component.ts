import { Component, HostListener, ChangeDetectionStrategy, Input } from "@angular/core";
import { Department } from "../../services/departments.service";
import { Subject } from "rxjs";

@Component({
  selector: "store-custom-option",
  templateUrl: "./custom-option.component.html",
  styleUrls: ["./custom-option.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomOptionComponent {
  @Input("optionData") option: Department;

  optionSubject: Subject<Department> = new Subject();

  @HostListener("click")
  onClick() {
    this.optionSubject.next(this.option);
  }
}
