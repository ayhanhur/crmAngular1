
import { Injectable } from '@angular/core';
import {NgbDatepickerI18n} from '@ng-bootstrap/ng-bootstrap';

const DATE_I18 = {
  'tr': {
      weekdays: ['Pt', 'Sa', 'Ça', 'Pe', 'Cu', 'Ct', 'Pz'],
      months: ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'],
  }
}

@Injectable()
export class I18n {
  language = 'tr';
}
@Injectable()
export class I18LangService extends NgbDatepickerI18n {

  constructor(public _i18n: I18n) {
    super();
   }
  
   getWeekdayShortName(weekday: number): string {
    return DATE_I18[this._i18n.language].weekdays[weekday - 1];
  }
  getMonthShortName(month: number): string {
    return DATE_I18[this._i18n.language].months[month - 1];
  }
  getMonthFullName(month: number): string {
    return this.getMonthShortName(month);
  }
}
