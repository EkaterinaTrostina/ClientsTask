import { Injectable, OnDestroy } from '@angular/core';
import { StateService } from 'src/app/shared/services/state.serive';
import { ClientService } from './client.service';
import { Observable, of } from 'rxjs';
import { Client } from 'src/app/shared/models/client';

const initialState: Client = null!;

@Injectable({
    providedIn: 'root',
})
export class ClientStateService extends StateService<Client>{
    client: Observable<Client> = this.state;

    constructor(private clientService: ClientService) {
        super(initialState);
    }

    getClient(clientId: number) {
        this.clientService.getClient(clientId).subscribe((client) => {
            this.setNewState(client);
        });
    }

    changeClientPhone(clientId: number, phone: string){
        this.clientService
            .changeClientPhone(clientId, phone)
            .subscribe((res) => {
                this.setState({phone});
                return res;
            });
    }

    getPhone(): Observable<string> {
        return this.select(state => state?.phone);
    }
}
