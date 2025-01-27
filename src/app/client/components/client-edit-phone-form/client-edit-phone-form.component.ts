import { ChangeDetectorRef } from '@angular/core';
import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    OnDestroy,
    OnInit,
    Output,
} from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Subscription, take, takeUntil, tap } from 'rxjs';
import { ClientStateService } from '../../services/client-state.service';
import { PhoneInputComponent } from 'src/app/shared/components/phone-input/phone-input.component';
import { ButtonDirective } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentDestroy } from 'src/app/shared/helpers/destroy.class';

@Component({
    selector: 'app-client-edit-phone-form',
    templateUrl: './client-edit-phone-form.component.html',
    styleUrls: ['./client-edit-phone-form.component.scss'],
    imports: [PhoneInputComponent, ButtonDirective, ConfirmDialogModule, ReactiveFormsModule],
    providers: [ConfirmationService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientEditPhoneFormComponent extends ComponentDestroy implements OnInit, OnDestroy {
    public form = new FormGroup({
        phone: new FormControl(''),
    });

    public phone$ = this.clientStateService.getProperty('phone');
    
    @Output() public closeForm: EventEmitter<void> = new EventEmitter();

    constructor(
        private confirmationService: ConfirmationService,
        private clientStateService: ClientStateService,
    ) {
        super()
    }

    public ngOnInit(): void {
        this.setPhoneToForm();
    }

    public submitForm(): void  {
        this.confirmationService.confirm({
            header: 'Подтверждение',
            message: 'Подтверждаете смену номера телефона?',
            acceptLabel: 'Подтвердить',
            rejectLabel: 'Отмена',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.clientStateService.changeClientPhone(
                    this.clientStateService.getSnapshotProperty('id'),
                    this.form.get('phone').value
                );
                this.close();
            },
            reject: () => {
                this.close();
            },
        });
    }

    public close(): void {
        this.closeForm.emit();
    }

    private setPhoneToForm(): void {
        this.phone$.pipe(
            takeUntil(this.destroy$),
            take(1),
            tap(phone => this.form.get('phone').setValue(phone))
        ).subscribe();
    }
}
