import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs';
import { Observable } from 'rxjs';
import { Client } from 'src/app/shared/models/client';
import { HandleErrorService } from 'src/app/shared/services/handle-error.service';

@Injectable({
    providedIn: 'root',
})
export class ClientService {
    constructor(
        private http: HttpClient,
        private handleErrorService: HandleErrorService
    ) {}

    public changeClientPhone(clientId: number, phone: string): Observable<boolean> {
        return this.http
            .post<boolean>(`/${clientId}/changephone`, { phone })
            .pipe(catchError(this.handleErrorService.handleError));
    }

    public getClient(clientId: number): Observable<Client> {
        return this.http
            .get<Client>('/clients/' + clientId)
            .pipe(catchError(this.handleErrorService.handleError));
    }
}
