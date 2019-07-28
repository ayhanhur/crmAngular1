import { Injectable } from '@angular/core';

@Injectable()
export class CalculationService {

  constructor() { }
  
  calculatePercent(a,b,modulus:{status?:boolean,modNumber?:number}) {
    let calculate = (a / b) * 100;
    /**
     * yüzde de katlı sayıların hesabında
     */
    if(modulus.status == true)
      {
        for( let i = 0; i < 100; i++)
          {
            if(i % modulus.modNumber == 0) {
              if(calculate < i) {
                calculate = i;
                break;
               
              }
            }
          }
      }
    return Math.floor(calculate);
  }
}
