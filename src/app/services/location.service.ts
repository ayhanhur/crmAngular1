import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import {JunocrmService} from './junocrm.service';
import {Customer} from '../classes/customer';
import {environment as Env} from './../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class LocationService {

  constructor(
      private junoCrmService: JunocrmService,
      private httpClient: HttpClient
  ) { }



}
