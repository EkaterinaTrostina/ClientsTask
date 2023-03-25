import { Injectable } from '@angular/core';
import { delay, of } from 'rxjs';
import {
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpResponse,
} from '@angular/common/http';

import { mockData } from 'src/assets/mocks';

@Injectable({
    providedIn: 'root',
})
export class MockInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): any {
        return this.handleRequests(req, next);
    }

    handleRequests(req: HttpRequest<any>, next: HttpHandler) {
        const { url, body, method } = req;
        switch (method) {
            case 'GET':
                if (mockData[url]) {
                    return of(
                        new HttpResponse({
                            status: 200,
                            body: mockData[url],
                        })
                    ).pipe(delay(500));
                } else {
                    return next.handle(req);
                }

            case 'POST':
                //если хочется изменить свойство phone

                if (url.endsWith('changephone')) {
                    const clientId = url.split('/')[1];
                    const client = mockData['/clients/' + clientId];
                    client['phone'] = body['phone'];

                    return of(
                        new HttpResponse({ status: 200, body: true })
                    ).pipe(delay(500));
                } else {
                    return of(
                        new HttpResponse({ status: 200, body: body })
                    ).pipe(delay(500));
                }


            default:
                return next.handle(req);
        }
    }
}
