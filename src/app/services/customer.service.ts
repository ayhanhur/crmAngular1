import {Injectable} from '@angular/core';
import { Observable } from 'rxjs/Rx';
import {JunocrmService} from './junocrm.service';
import {Customer} from '../classes/customer';
import {environment as Env} from './../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class CustomerService {
    apiUrl = Env.api.mockCustomer;

    constructor(
        private junoCrmService: JunocrmService,
        private httpClient: HttpClient
        ) {
    }
    // Execute Function Islemleri
    customerRegister(params: any) {
        return this.junoCrmService.executePost('jcsp_Customer_Save', params)
    }

    customerSaveEvent(params: any) {
        return this.junoCrmService.executePost('jcsp_Event_Save', params);
    }

    customerSaveAddress(params: any) {
        return this.junoCrmService.executePost('ogsp_Address_Save', params);
    }

    customerSaveContact(params: any) {
        return this.junoCrmService.executePost('ogsp_Contact_Save', params);
    }

    customerGetEventActors(params: any) {
        return this.junoCrmService.executePost('ogsp_InvolvedActor_List_ByEvent', params);
    }

    getPersonal(params: any){
        return this.junoCrmService.executePost('ogsp_Personnel_List_ByEmployer', params);
    }

    getRepresants(params: any) {
        return this.junoCrmService.executePost('jcsp_Customer_Find', params);
    }

    customerGetDetail(params: any) {
        return this.junoCrmService.executePost('jcsp_Customer_Get', params)
    }

    customerGetTasks(params: any) {
        return this.junoCrmService.executePost('jcsp_InvolvedActor_List_ByActor', params);
    }

    customerGetAddress(params: any) {
        return this.junoCrmService.executePost('ogsp_Address_Get', params);
    }


    // Execute Function Islemleri Sonu...

    saveCustomer(customer: any){
        return this.httpClient.post(this.apiUrl + 'customer', customer).subscribe( res => { });
    }

    updateCustomer(customerid: number, params){
        return this.httpClient.put(this.apiUrl + '/customer/' + customerid, params);
    }

    getCustomerList(params: any): Observable<any> {
        return this.httpClient.get(this.apiUrl + 'customer');
        // return this.junoCrmService.executePost('jcsp_Customer_List', params);
    }

    getRepresantsList(params: any): Observable<any> {
        return this.httpClient.get(this.apiUrl + 'user');
        // return this.junoCrmService.executePost('jcsp_Represants_List', params);
    }

    postCustomer(params:any): Observable<any> {
        return this.httpClient.post(this.apiUrl + 'customer', params);
    }

    postCustomerToRepresant(represant: number, params):Observable<any>{
        return this.httpClient.post(this.apiUrl + '/user/' + represant + '/usercustomers', params);
    }



}
