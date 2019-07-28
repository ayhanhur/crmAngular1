import {LoaderService} from './loader.service';
import {Router} from '@angular/router';


import {Injectable} from '@angular/core';
import {environment as Env} from '../../environments/environment';
import {LocalStorageService} from 'angular-2-local-storage/dist';
import {Http} from '@angular/http';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {IAuth, IToken} from './../models/authentication';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs';

import { Roles as userRole } from './../classes/roles';

@Injectable()
export class AuthenticationService {
    apiUrl = Env.api.host;
    endPoint = {
        login: 'Login',
        token: 'checkaccesstoken'
    };

    isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject(false);
    userRoles: BehaviorSubject<{Roles:Array<any>}> = new BehaviorSubject(null);
    userRoles$ = this.userRoles.asObservable();
    roles;
    token:any;

    constructor(
        private httpClient: HttpClient,
        private http: Http,
        private localStorage: LocalStorageService,
        private router: Router,
        private loaderService: LoaderService
    ) {
        // console.log('Storage Set Test', this.localStorage.get('account'));
        const account = this.localStorage.get('account');
        const roles = this.localStorage.get('roles');
        if(account){
            this.checkAccessToken(account['token']).subscribe((result: IToken) => {
                if(result.AccessTokenIsValid === true) {
                    if(roles) {
                        this.roles = roles;
                    }
                    // console.log('Valid Token');
                    // console.log('Roles Data', roles);
                    this.loginCompleted();
                }
                else {
                    this.logout();
                }
            },(err: HttpErrorResponse) =>  {
                console.log('Error On ');
            })
        }
        else {
            this.logout();
        }
    }

    login(username: string, password: string, headers?: HttpHeaders | null) {
        const body = {
            'Username': username,
            'Password': password
        }
        this.httpClient.post<IAuth>(this.apiUrl + this.endPoint.login, body
        ).subscribe(response => {
            if (response.ResponseCode === 0) {
                this.token = response.AccessToken;
                console.log('Login Response', response);
                this.checkAccessToken(this.token).subscribe((result: IToken) => {
                    if (result.AccessTokenIsValid === true && result.ResponseCode === 0) {

                        this.localStorage.set('account', {
                            token: this.token,
                            isValid: result.AccessTokenIsValid,
                            name: response.Name,
                            surname: response.Surname,
                            image: response.Image128,
                            personId: response.PersonID,
                            functions: response.UserFunctions
                        });
                        this.roles = response.UserFunctions;
                        this.userRoles.next({Roles: this.roles});
                        this.userRoles.complete();
                        this.localStorage.set('roles', response.UserFunctions);
                        // this.loginCompleted();
                        this.redirectToRole();
                        return this.userRoles$;
                    }
                    else {
                        this.loginFail();
                    }

                })
            }
            else {
                this.loginFail();
            }
            console.log(response);
        }, (err: HttpErrorResponse) => {
            this.loginFail();
            console.log('Bir Hata Oluştu', err);

        });

    }

    checkAccessToken(accessToken: string): Observable<any> {
        const act = {
            'AccessToken': accessToken
        }
        return this.httpClient.post<IToken>(this.apiUrl + this.endPoint.token, act);
    }

    getAuthenticatedUser() {

    }

    getPersonId() {
        return this.localStorage.get('account')['personId'];
    }

    getUserName() {
        return this.localStorage.get('account')['name'] + ' ' + this.localStorage.get('account')['surname'];
    }

    getUserImage() {
        return this.localStorage.get('account')['image'];
    }

    getTokenValidation(token) {
        return token
    }

    getToken() {
        return this.localStorage.get('account')['token'];
    }

    loginCompleted() {
        const logged = true;
        this.isLoggedIn$.next(logged);
        this.loaderService.updateIndicator(false);
        this.router.navigate(['/customer-register']);
        this.getTokenValidation(this.token);
    }


    //Hakan Bu Gecici cozum sen kendin ayarlarsin musait olunca
    redirectToRole(){
        if(this.roles.indexOf(userRole.ROLE_MANAGER) > -1){
            this.router.navigate(['/salesman']);
            return;
        }
        if(this.roles.indexOf(userRole.ROLE_SALESMAN) > -1){
            this.router.navigate(['/salesman']);
            return;
        }
        if(this.roles.indexOf(userRole.ROLE_DESK) > -1){
            this.router.navigate(['/desk']);
            return;
        }
    }

    loginFail() {
        this.loaderService.updateIndicator(false);
    }

    logout() {
        this.isLoggedIn$.next(false);
        this.roles = null;
        this.localStorage.remove('roles');
        this.localStorage.remove('account');
        this.token = null;
        this.router.navigate(['/login']);
        this.loaderService.updateIndicator(false);
    }

    redirect(redirectTo: any) {
        return this.router.navigate([redirectTo]);
    }

    private setHeaders(headers: HttpHeaders | null) {
        headers = headers || new HttpHeaders();

        headers = headers.set('Content-Type', 'application/json');
        headers = headers.set('Accept', 'application/json');

        return {
            headers: headers
        }
    } 
    
    isRoleAuthenticate(...roles:any[]):boolean {
        if( Object.prototype.toString.call( roles[0] ) === '[object Array]' ) roles = roles[0];
        return !roles ? true : this.roles && roles.find(item => this.roles.find(role => item == role) != undefined) != undefined;
    }

    hasUserOnlyRole(role: number): boolean {
        return true;
    }    

}
