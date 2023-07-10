import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, catchError, throwError } from "rxjs";
import { AuthenticationService } from "src/app/services/authentication.service";
@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    constructor(private authService : AuthenticationService,private router:Router){}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token = this.authService.getToken();
        if (token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                },
            });
        }
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => this.handleErrorRes(error))
        );
    }
    private handleErrorRes(error: HttpErrorResponse): Observable<never> {
        if (error.status === 401) {
            this.router.navigateByUrl("/Authentication");
        }
        return throwError(() => error);
    }
}