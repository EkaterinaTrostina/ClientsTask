import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { ShortClient } from 'src/app/shared/models/short-client';
import { HandleErrorService } from 'src/app/shared/services/handle-error.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ClientsService {
    constructor(private http: HttpClient, private handleErrorService: HandleErrorService) {}

    getClients(): Observable<ShortClient[]> {
        return this.http
            .get<ShortClient[]>('/clients')
            .pipe(catchError(this.handleErrorService.handleError));
    }
}
