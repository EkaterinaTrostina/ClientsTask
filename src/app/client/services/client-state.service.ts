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
    constructor(private clientService: ClientService) {
        super(initialState);
    }

    init(clientId: number) {
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

    getProperty<K extends keyof Client>(key: K): Observable<Client[K]> {
        return this.select(state => state[key]);
    }

    clearClient(){
        this.setNewState(null!)
    }
}
