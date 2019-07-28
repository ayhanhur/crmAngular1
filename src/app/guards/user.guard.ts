import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from 'app/services/authentication.service';

@Injectable()
export class UserGuard implements CanActivate,  CanActivateChild {
  constructor(
    private authService: AuthenticationService, private router: Router
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let url: string = state.url;
    return this.checkLogin(url, next.data);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(route, state);
  }

  checkLogin(url:string,routeData): boolean {
    if(this.authService.getToken()) {
      this.authService.isRoleAuthenticate(routeData['userRoles']);
      return routeData && routeData['userRoles'] ? this.authService.isRoleAuthenticate(routeData["userRoles"]) : true;
    }
    else {
      url = 'login';
    }
    this.router.navigate([url]);
    return false;   
  }

/*   checkLogins(url: string, routeData: {}): boolean {
    if (this.authService.getToken && this.authService.getAuthenticatedUser()) {
    	return routeData && routeData["userRoles"] ? this.authService.roleHasAuthenticate(routeData["userRoles"]) : true;
    }else{
    	url = 'login';
    }
    this.router.navigate([url]);
    return false;

  } */


  
}
