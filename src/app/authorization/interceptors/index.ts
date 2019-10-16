import { TokenInterceptor } from "./token-interceptor";
import { HTTP_INTERCEPTORS } from "@angular/common/http";

export const authInterceptorsProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
];
