import { Component, forwardRef, Input, OnDestroy, OnInit } from '@angular/core';
import {
    ControlValueAccessor,
    FormControl,
    NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-phone-input',
    templateUrl: './phone-input.component.html',
    styleUrls: ['./phone-input.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => PhoneInputComponent),
            multi: true,
        },
    ],
})
export class PhoneInputComponent
    implements ControlValueAccessor, OnInit, OnDestroy
{
    @Input() mask = '+7 (999) 999 99 99';
    @Input() placeholder = '+7 (999) 999 99 99';
    @Input() required = false;

    onChange = (value: any) => {};
    onTouched = (value: any) => {};

    inputControl = new FormControl();
    subscription: Subscription;

    ngOnInit(): void {
        this.subscription = this.inputControl.valueChanges.subscribe((cur) => {
            this.change(cur);
        });
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    registerOnChange(fn: any) {
        this.onChange = fn;
    }

    registerOnTouched(fn: any) {
        this.onTouched = fn;
    }

    change(value: string | null) {
        this.onChange(value);
        this.onTouched(value);
    }

    writeValue(value: string): void {
        this.inputControl.setValue(value, { emitEvent: false, onlySelf: true });
    }
}
