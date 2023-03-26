import { Injectable, OnDestroy } from '@angular/core';
import { ShortClient } from 'src/app/shared/models/short-client';
import { StateService } from 'src/app/shared/services/state.serive';
import { ClientsService } from './clients.service';
import { Observable } from 'rxjs';

const initialState: ShortClient[] = [];

@Injectable({
    providedIn: 'root',
})
export class ClientsStateService extends StateService<ShortClient[]> {
    constructor(private clientsService: ClientsService) {
        super(initialState);
        this.init();
    }

    private init() {
        this.clientsService
            .getClients()
            .subscribe((clients) => this.setNewState(clients));
    }
}
