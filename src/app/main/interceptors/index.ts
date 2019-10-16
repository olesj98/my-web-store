import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { HandleErrorInterceptor } from "./handle-error-interceptor";

export const mainInterceptorProwiders = [
    { provide: HTTP_INTERCEPTORS, useClass: HandleErrorInterceptor, multi: true }
];
