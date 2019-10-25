import { Component, ChangeDetectionStrategy, Output, EventEmitter, forwardRef, Input } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { Observable } from 'rxjs';

@Component({
  selector: "store-sort-by",
  templateUrl: "./sort-by.component.html",
  styleUrls: ["./sort-by.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SortByComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SortByComponent implements ControlValueAccessor {
  @Input("optionsList") set optionsList(options: Observable<any>) {
    this.options$ = options;
  }
  @Output() sortTypeSelected: EventEmitter<string> = new EventEmitter<string>();

  hideOptions: boolean;
  selectedValue: string;
  initialValue = "Sort by";
  options$;

  constructor() {
    this.hideOptions = true;
    this.selectedValue = "";
  }

  selectValue(value) {
    this.writeValue(value);
  }

  toggleSelect(option: boolean) {
    if (!option) {
      this.hideOptions = !this.hideOptions;
    } else {
      this.hideOptions = option;
    }
  }

  onChange = (value) => {};
  onTouched = () => {};

  writeValue(value) {
    this.selectedValue = value.name;
    this.onChange(value);
    this.sortTypeSelected.emit();
  }
  registerOnChange(fn: (value) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

}
