import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientTransaction } from 'src/app/shared/models/client-transaction';
import { TransactionType } from 'src/app/shared/models/transaction-type';
import { ClientStateService } from '../../services/client-state.service';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { MomentModule } from 'ngx-moment';

@Component({
    selector: 'app-client-transactions',
    templateUrl: './client-transactions.component.html',
    styleUrls: ['./client-transactions.component.scss'],
    imports: [CommonModule, TableModule, MomentModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientTransactionsComponent {
    public transactions$: Observable<ClientTransaction[]> =
        this.clientStateService.getProperty('transactions');

    public transactionType = TransactionType;

    constructor(private clientStateService: ClientStateService) {}
}
