

import { Component, OnInit, Output, EventEmitter,AfterViewInit } from '@angular/core';
import { NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { I18LangService,I18n } from './../../services/i18-lang.service';
@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  providers: [I18n, {provide: NgbDatepickerI18n, useClass: I18LangService}]
})
export class DatepickerComponent implements OnInit {
  @Output() dateEvent = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }
  onDateChange(date) {
    this.dateEvent.emit(date);
  }

}
