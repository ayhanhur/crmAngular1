import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-register',
  templateUrl: './customer-register.component.html',
  styleUrls: ['./customer-register.component.scss']
})
export class CustomerRegisterComponent implements OnInit {
  indicatorStatus = false;
  customers: any;

  constructor() { }

  ngOnInit() {
  }

  status(event) {
    this.indicatorStatus = event.status;
    setTimeout(() => {
      this.indicatorStatus = false;
    },1000);
  }

}
