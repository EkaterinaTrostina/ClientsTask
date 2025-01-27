import {
    ChangeDetectionStrategy,
    Component,
} from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ShortClient } from '../shared/models/short-client';
import { ClientsStateService } from './services/clients-state.service';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { MomentModule } from 'ngx-moment';

@Component({
    selector: 'app-clients',
    templateUrl: './clients.component.html',
    styleUrls: ['./clients.component.scss'],
    imports: [TableModule, CommonModule, MomentModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientsComponent {
    public clients$: Observable<ShortClient[]> = this.clientsService.state;

    constructor(
        private router: Router,
        private clientsService: ClientsStateService,
    ) {}

    public onRowSelect(event: any) {
        this.router.navigateByUrl('/client/' + event.data.id);
    }
}
