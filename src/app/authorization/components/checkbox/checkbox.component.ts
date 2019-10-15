import { Component, forwardRef, OnInit } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from "@angular/forms";

@Component({
    selector: "store-checkbox",
    templateUrl: "./checkbox.component.html",
    styleUrls: ["./checkbox.component.scss"],
    providers: [
      {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => CheckboxComponent),
        multi: true
      }
    ]
})
export class CheckboxComponent implements OnInit, ControlValueAccessor {
    checked = false;
    checkbox = new FormControl("");

    ngOnInit() {
    }

    get value(): boolean {
        return this.checkbox.value;
    }

    toggleCheckbox() {
        this.checked = !this.checked;
        this.writeValue(this.checked);
    }

    writeValue(isChecked: boolean): void {
        this.checkbox.setValue(isChecked);
        this.onChange(this.value);
    }

    onChange = (isChecked: boolean) => {};
    onTouch = () => {};

    registerOnChange( fn: (isChecked: boolean) => void ): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouch = fn;
    }

}
