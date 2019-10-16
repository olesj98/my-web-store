import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { HttpErorr } from "src/app/authorization/models/error";
import { environment } from "../../../environments/environment";
import { UnpredictableError } from "../models/unpredictableError";

@Injectable()
export class HandleErrorInterceptor implements HttpInterceptor {

    basePath = environment.basePath;
    loginPaths = [
        `${this.basePath}/customers/login`,
        `${this.basePath}/customers/facebook`,
        `${this.basePath}/customers`,
        `${this.basePath}/customer`,
    ];

    checkUrl(requestUrl: string) {
        return this.loginPaths.includes(requestUrl);
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
            .pipe(
                // tap(() => console.log("errorHandling interceptor")),
                catchError(error => {
                    if (this.checkUrl(req.url)) {
                        const err: HttpErorr = {
                            name: error.name,
                            message: error.error.error.message,
                            status: error.error.error.status
                        };
                        return throwError(err);
                    } else {
                        // na newidfiltrowani stezky kydaty ?? - pryjdetsia subscribe dawaty(use 2 argument) - czy je wariant z async pipe
                        const unpredictableError: UnpredictableError = {
                            status: error.status,
                            message: error.message,
                            name: "unpredictable erorr"
                        };
                        return throwError(unpredictableError);
                    }
                    // TODO
                    // zrobic filter na wszystkie errory zeby w kazdym wypadku cos przychodzilo
                    // np. dla requestu na products - w wypadku erroru wernuty pustyj masyw []
                })
            );
    }
}
