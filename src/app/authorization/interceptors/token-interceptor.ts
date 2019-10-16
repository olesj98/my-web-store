import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { Bearer } from "../utils/bearer";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = Bearer.getTokenFromStorage();

        if (token) {
            const request = req.clone(
                { headers: req.headers.set("user-key", token) }
            );
            // console.log(request);
            return next.handle(request);
        }
        return next.handle(req);
    }
}
