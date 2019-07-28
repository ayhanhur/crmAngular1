import {LocalStorageService} from 'angular-2-local-storage/dist';
import {HttpClient} from '@angular/common/http';
import {environment} from './../../environments/environment';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {IExecuteFunction} from '../models/execute-function';

@Injectable()
export class JunocrmService {

    apiUrl: string = environment.api.host;
    endPoint: string = 'executefunction';

    constructor(
        private http: HttpClient,
        private localStorageService: LocalStorageService
    ) {
    }

    executePost(endPoint: string, params: any): Observable<any> {
        /** Bütün requestlerde dil parametresi gitmeli (3 => Türkçe, 2 => En gibi...) */
        params.push({'Name': '@UserID', 'Value': this.localStorageService.get('account')['personId']});
        params.push({'Name': '@ULanguageID', 'Value': 3});
        const data = {
            'AccessToken': this.localStorageService.get('account')['token'],
            'Function': endPoint,
            'Parameters': params,
        }
        return this.http.post<IExecuteFunction>(this.apiUrl + this.endPoint, data);
    }

}
