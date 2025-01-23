import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { ClientTransaction } from 'src/app/shared/models/client-transaction';
import { TransactionType } from 'src/app/shared/models/transaction-type';
import { ClientStateService } from '../../services/client-state.service';

@Component({
    selector: 'app-client-transactions',
    templateUrl: './client-transactions.component.html',
    styleUrls: ['./client-transactions.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ClientTransactionsComponent implements OnInit, OnDestroy {
    transactions: ClientTransaction[];
    subscription: Subscription;

    transactionType = TransactionType;

    constructor(
        private clientStateService: ClientStateService,
        private changeDetectorRef: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.subscription = this.clientStateService
            .getProperty('transactions')
            .subscribe((transactions) => {
                this.transactions = transactions;
                this.changeDetectorRef.detectChanges();
            });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
