
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment as Env} from './../../environments/environment';
import {JunocrmService} from './junocrm.service';



@Injectable()
export class TypeaheadService {

  constructor(
      private httpClient: HttpClient,
      private junoCrmService: JunocrmService
  ) { }

  /*searchCustomer(term): Observable<any>{
    let customerEndPoint = Env.api.mockCustomer + 'customer';
    return this.httpClient.get(customerEndPoint + '?search=' + term)
  }*/


    searchCustomer(term){
      const params = [
          {'Name': '@Name', 'Value': term}
      ];
      return this.junoCrmService.executePost('jcsp_Customer_Find', params)
          .toPromise()
          .then( customer => {
            const customerData = customer.Data.jcsp_Customer_Find;
            if(customerData.length > 0){
              let customerArr: any = [];
              for(const i in customerData){
                customerArr.push({
                    'id': customerData[i].PersonID,
                    'name': customerData[i].Name + ' ' + customerData[i].Surname
                });
              }
              return customerArr;
            }
          });
    }




}
