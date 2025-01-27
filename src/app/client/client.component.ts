import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Client } from '../shared/models/client';
import { ClientStateService } from './services/client-state.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ClientTransactionsComponent } from './components/client-transactions/client-transactions.component';
import { ClientEditPhoneFormComponent } from './components/client-edit-phone-form/client-edit-phone-form.component';
import { CommonModule } from '@angular/common';
import { MomentModule } from 'ngx-moment';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-client',
    templateUrl: './client.component.html',
    styleUrls: ['./client.component.scss'],
    imports: [CommonModule, ProgressSpinnerModule, ClientTransactionsComponent, ClientEditPhoneFormComponent, MomentModule, CardModule, ButtonModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientComponent implements OnInit, OnDestroy {
    public client$: Observable<Client> = this.clientStateService.state;
    public isShowEditPhoneForm: boolean = false;

    constructor(
        private clientStateService: ClientStateService,
        private route: ActivatedRoute,
    ) {}

    public ngOnInit(): void {
        this.clientStateService.init(this.route.snapshot.params['id']);
    }

    public ngOnDestroy(): void {
        this.clientStateService.clearClient();
    }

    public togglePhoneForm(): void {
        this.isShowEditPhoneForm = !this.isShowEditPhoneForm;
    }
}
