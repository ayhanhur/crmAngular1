/**
 * @author : Hakan Hurriyet
 * Logs the Request and Response time together
 */

import { Injectable } from '@angular/core';
import { HttpRequest,HttpHandler, HttpInterceptor,HttpEvent, HttpResponse   } from '@angular/common/http';
import 'rxjs/add/operator/do';
import { Observable } from 'rxjs/Observable';
import { LoaderService } from '../services/loader.service';

@Injectable()
export class TimingInterceptor implements HttpInterceptor {
    constructor(private loaderService: LoaderService) {}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {  
        const started = Date.now();
        this.loaderService.updateIndicator(false);
        const self = this;
        return next.handle(req).do(event => {
            if(event instanceof HttpResponse) {
                const elapsed = Date.now() - started;
                // console.log(`Request for ${req.urlWithParams} took ${elapsed} ms.`);
            }
        })
    }
}