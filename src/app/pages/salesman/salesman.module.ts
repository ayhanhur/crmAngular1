import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SalesmanComponent } from './salesman.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from './../../components/components.module';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Satış Sorumlusu',
      urls: [{title: 'Dashboard', url: '/'},{title: 'Satış Sorumlusu'}, {title: 'Ana Ekran'}]
    },
    component: SalesmanComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    RouterModule.forChild(routes),
    NgbModule.forRoot()
  ],
  declarations: [SalesmanComponent],
})
export class SalesmanModule { }
