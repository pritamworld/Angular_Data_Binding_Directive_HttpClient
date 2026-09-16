import {
    HttpRequest,
    HttpResponse,
    HttpInterceptorFn,
    HttpHandlerFn,
} from '@angular/common/http';
import { tap } from 'rxjs/operators';

export const httpInterceptor: HttpInterceptorFn = (
    req: HttpRequest<unknown>,
    next: HttpHandlerFn
) => {
    const started = Date.now();

    return next(req).pipe(
        tap((event) => {
            if (event instanceof HttpResponse) {
                const elapsed = Date.now() - started;
                console.log(`Request for ${req.urlWithParams} took ${elapsed} ms.`);
            }
        })
    );
};
