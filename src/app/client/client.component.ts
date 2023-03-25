import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Client } from '../shared/models/client';
import { TransactionType } from '../shared/models/transaction-type';
import { ClientStateService } from './services/client-state.service';

@Component({
    selector: 'app-client',
    templateUrl: './client.component.html',
    styleUrls: ['./client.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientComponent implements OnInit, OnDestroy {
    client: Client;
    isShowEditPhoneForm = false;
    transactionType = TransactionType;
    subscription: Subscription;

    constructor(
        private clientStateService: ClientStateService,
        private route: ActivatedRoute,
        private changeDetectorRef: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        const clientId = this.route.snapshot.params['id'];

        this.clientStateService.getClient(clientId);

        this.subscription = this.clientStateService.client.subscribe(
            (client) => {
                this.client = client;
                this.changeDetectorRef.detectChanges();
            }
        );
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    togglePhoneForm() {
        this.isShowEditPhoneForm = !this.isShowEditPhoneForm;
    }
}