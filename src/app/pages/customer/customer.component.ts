import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
	title:string;
	subtitle:string;	
	constructor() {
		this.title = "Customer Component";  
		this.subtitle = "This is some text within a card block."
	}

  ngOnInit() {
  }

}
