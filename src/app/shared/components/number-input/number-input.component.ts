import { Component, forwardRef, Input } from '@angular/core';
import {
    ControlValueAccessor,
    UntypedFormControl,
    NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
    selector: 'app-number-input',
    templateUrl: './number-input.component.html',
    styleUrls: ['./number-input.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => NumberInputComponent),
            multi: true,
        },
    ],
})
export class NumberInputComponent implements ControlValueAccessor {
    @Input() minFractionDigits = 0;
    @Input() maxFractionDigits = 0;
    @Input() min = 0;
    @Input() currency = 'USD';
    @Input() allowEmpty = true;

    inputControl = new UntypedFormControl();

    onChange = (value: any) => {};
    onTouched = (value: any) => {};

    registerOnChange(fn: any) {
        this.onChange = fn;
    }

    registerOnTouched(fn: any) {
        this.onTouched = fn;
    }

    change(value: number | null) {
        console.dir(value);
        this.onChange(value);
        this.onTouched(value);
    }

    writeValue(value: number): void {
        this.inputControl.setValue(value);
    }
}
