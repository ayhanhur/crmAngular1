

import { Component, OnInit } from '@angular/core';
import { IDashboard } from '../../models/dashboard';
import { CalculationService } from './../../services/calculation.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers:[CalculationService]
})
export class DashboardComponent implements OnInit {
  dashBoardList: IDashboard[];
  constructor( private calculationService:CalculationService) { }

  ngOnInit() {
    this.dashBoardList = [
      {
        id: 1,
        title:'Aramalar',
        callData: {
          total:347,
          incoming:100,
          outgoing:26
        }
      },
      {
        id: 2,
        title:'Randevular',
        callData: {
          total:180,
          incoming:100,
          outgoing:34
        }
      },
      {
        id: 3,
        title:'Görüşmeler',
        callData: {
          total:421,
          incoming:100,
          outgoing:19
        }
      },
      {
        id: 4,
        title:'Satışlar',
        callData: {
          total:73,
          incoming:100,
          outgoing:2
        }
      },
      {
        id: 5,
        title:'Daireler',
        callData: {
          total:34,
          incoming:100,
          outgoing:8
        }
      },
      {
        id: 6,
        title:'Ödemeler',
        callData: {
          total:94,
          incoming:100,
          outgoing:74
        }
      }                 
    ]  
  }
    calculate(a,b) {

    return this.calculationService.calculatePercent(a,b,{status:true,modNumber:5});
  }

}
