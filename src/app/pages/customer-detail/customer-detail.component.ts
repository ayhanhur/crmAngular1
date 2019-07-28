import { Component, OnInit } from '@angular/core';
import {CustomerService} from '../../services/customer.service';
import {DefinitionService} from '../../services/definition.service';
import {Router, ActivatedRoute} from '@angular/router';
import {LocalStorageService} from 'angular-2-local-storage';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent implements OnInit {

  customerID: number;
  customer: any;


  constructor(
      private customerService: CustomerService,
      private definitionService: DefinitionService,
      private localStorageService: LocalStorageService,
      private route: ActivatedRoute
  ) { }

  ngOnInit() {
      this.route.params.subscribe( params => {
        this.customerID = params['id'];
        const customerParams = [
            {'Name': '@PersonID', 'Value': this.customerID}
        ];
        this.customerService.customerGetDetail(customerParams)
            .toPromise()
            .then(customerResponse => {
              this.customer = customerResponse.Data.jcsp_Customer_Get[0];
            });

      });
  }

}
