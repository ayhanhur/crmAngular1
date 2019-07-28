import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import {NgbTimepickerConfig} from '@ng-bootstrap/ng-bootstrap';
import {NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-timepicker',
  templateUrl: './timepicker.component.html',
  styleUrls: ['./timepicker.component.scss'],
  providers:[NgbTimepickerConfig]
})
export class TimepickerComponent implements OnInit {
  @Output() timeEvent = new EventEmitter<{time:any}>();
  time = {hour: 0,minute:0};
  constructor() {

   }

  ngOnInit() {
     
  }

  timeChange(event){
    this.timeEvent.emit({time:event})
  }



}
