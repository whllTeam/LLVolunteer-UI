import { IdentityService } from '../Service/identity.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthorizationHeaderInterceptor implements HttpInterceptor {

    constructor(private openIdConnectService: IdentityService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<any>> {
        // add the access token as bearer token

        if (this.openIdConnectService.userAvailable) {
            request = request.clone(
                {
                    setHeaders: {
                        Authorization: `${this.openIdConnectService.user.token_type} ${this.openIdConnectService.user.access_token}`
                    }
                });
        }
        return next.handle(request);
    }
}
