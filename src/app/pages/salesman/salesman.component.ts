import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-salesman',
  templateUrl: './salesman.component.html',
  styleUrls: ['./salesman.component.scss']
})
export class SalesmanComponent implements OnInit {
  time = {hour: 13, minute: 30};
  constructor() { }

  ngOnInit() {
  }

}
