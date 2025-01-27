import { Component, Input } from '@angular/core';
import {
    ControlValueAccessor,
    ReactiveFormsModule,
    FormControl,
    NgControl,
} from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
    selector: 'app-number-input',
    templateUrl: './number-input.component.html',
    styleUrls: ['./number-input.component.scss'],
    imports: [InputNumberModule, ReactiveFormsModule],
})
export class NumberInputComponent implements ControlValueAccessor {
    @Input() minFractionDigits = 0;
    @Input() maxFractionDigits = 0;
    @Input() min = 0;
    @Input() currency = 'USD';
    @Input() allowEmpty = true;

    protected onChange: (value: any) => void;
    protected onTouched: (value: any) => void;

    public get control(): FormControl {
        return this.ngControl?.control as FormControl;
    }
    
    constructor(protected ngControl: NgControl) {
        ngControl.valueAccessor = this;
    }

    public registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    public change(value: number | string | null): void {
        this.onChange(value);
        this.onTouched(value);
    }

    public writeValue(value: number): void {}
}
