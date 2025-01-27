import { Component, Input } from '@angular/core';
import {
    ControlValueAccessor,
    ReactiveFormsModule,
    NgControl,
    FormControl,
} from '@angular/forms';
import { InputMaskModule } from 'primeng/inputmask';

@Component({
    selector: 'app-phone-input',
    templateUrl: './phone-input.component.html',
    styleUrls: ['./phone-input.component.scss'],
    imports: [InputMaskModule, ReactiveFormsModule],
})
export class PhoneInputComponent implements ControlValueAccessor {
    @Input() public mask = '+7 (999) 999 99 99';
    @Input() public placeholder = '+7 (999) 999 99 99';
    @Input() public required = false;

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

    public change(value: string | null): void {
        this.onChange(value);
        this.onTouched(value);
    }

    public writeValue(value: string): void {}
}
