import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, timer } from 'rxjs';
import { ShortClient } from '../shared/models/short-client';
import { ClientsStateService } from './services/clients-state.service';

@Component({
    selector: 'app-clients',
    templateUrl: './clients.component.html',
    styleUrls: ['./clients.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientsComponent implements OnInit, OnDestroy {
    clients: ShortClient[];

    subscription: Subscription = new Subscription()

    constructor(
        private router: Router,
        private clientsService: ClientsStateService,
        private changeDetectorRef: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.subscription.add(
            this.clientsService.state.subscribe((clients) => {
                this.clients = clients;
                this.changeDetectorRef.detectChanges();
            })
        )
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    onRowSelect(event: any) {
        this.router.navigateByUrl('/client/' + event.data.id);
    }
}
