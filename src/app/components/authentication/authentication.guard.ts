import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(public auth: AuthenticationService, public router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const expectedRole = route.data;
      const token = this.auth.getToken();
      // decode the token to get its payload
      //const tokenPayload = this.auth.decodeToken(token);
      /*if (
        !this.auth.isLoggedIn() || 
        tokenPayload.roles !== expectedRole
      ) {
        this.router.navigateByUrl('/Authentication'));
        return false;
      }*/
      return true;
  }
  
}
