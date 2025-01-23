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
import { Subscription } from 'rxjs';
import { ClientStateService } from '../../services/client-state.service';

@Component({
    selector: 'app-client-edit-phone-form',
    templateUrl: './client-edit-phone-form.component.html',
    styleUrls: ['./client-edit-phone-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ClientEditPhoneFormComponent implements OnInit, OnDestroy {
    @Output() closeForm: EventEmitter<boolean> = new EventEmitter();

    subscription: Subscription = new Subscription();

    phone: string;
    clientId: number;

    constructor(
        private confirmationService: ConfirmationService,
        private clientStateService: ClientStateService,
        private changeDetectorRef: ChangeDetectorRef
    ) {}

    ngOnInit() {
        this.subscription.add(
            this.clientStateService.getProperty('phone').subscribe((phone) => {
                this.phone = phone;
                this.changeDetectorRef.detectChanges();
            })
        );
        this.subscription.add(
            this.clientStateService.getProperty('id').subscribe((clientId) => {
                this.clientId = clientId;
                this.changeDetectorRef.detectChanges();
            })
        );
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    submitForm() {
        this.confirmationService.confirm({
            header: 'Подтверждение',
            message: 'Подтверждаете смену номера телефона?',
            acceptLabel: 'Подтвердить',
            rejectLabel: 'Отмена',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.clientStateService.changeClientPhone(
                    this.clientId,
                    this.phone
                );
                this.emitClose();
            },
            reject: () => {
                this.emitClose();
            },
        });
    }

    emitClose() {
        this.closeForm.emit(true);
    }
}
