import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class HandleErrorService {
    public handleError(error: HttpErrorResponse) {
        alert(error.message);
        return throwError(() => new Error(error.message));
    }
}
