import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from './auth.interceptor'
import { BaseInterceptor } from "./base.interceptor";

export const INTERCEPTOR_PROVIDERS = [
    { provide: HTTP_INTERCEPTORS, useClass: BaseInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
];
