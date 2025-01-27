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

    public init(clientId: number): void {
        this.clientService.getClient(clientId).subscribe((client) => {
            this.setNewState(client);
        });
    }

    public changeClientPhone(clientId: number, phone: string): void {
        this.clientService
            .changeClientPhone(clientId, phone)
            .subscribe((res) => {
                this.setState({phone});
                return res;
            });
    }

    public getProperty<K extends keyof Client>(key: K): Observable<Client[K]> {
        return this.select(state => state[key]);
    }

    public getSnapshotProperty<K extends keyof Client>(key: K): Client[K] {
        return this.selectSnapshot(key);
    }

    public clearClient(){
        this.setNewState(null!)
    }
}
