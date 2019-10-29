import { Component, ChangeDetectionStrategy, forwardRef, ContentChildren, QueryList, AfterContentInit, Input, Output, EventEmitter } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { CustomOptionComponent } from "../custom-option/custom-option.component";
import { merge } from "rxjs";

@Component({
  selector: "store-custom-select",
  templateUrl: "./custom-select.component.html",
  styleUrls: ["./custom-select.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomSelectComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomSelectComponent implements ControlValueAccessor, AfterContentInit {
  @ContentChildren(CustomOptionComponent, { descendants: true }) options: QueryList<CustomOptionComponent>;
  @Input("placeholder") initialValue: string;
  @Output() changeSelectedValue: EventEmitter<any> = new EventEmitter();
  hideOptions = true;
  selectedOption;

  constructor() {
  }

  ngAfterContentInit() {
    this.options.changes.subscribe((options) => {
      const optionsSubject = [];
      options.toArray().forEach((option: CustomOptionComponent) => {
        optionsSubject.push(option.optionSubject);
      });
      const selectOption$ = merge(...optionsSubject);
      selectOption$.subscribe(selectedOption => {
        this.selectValue(selectedOption);
      });
    });
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
    this.selectedOption = value.name;
    this.onChange(value);
    this.changeSelectedValue.emit();
  }
  registerOnChange(fn: (value) => void): void {
      this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
      this.onTouched = fn;
  }

}
