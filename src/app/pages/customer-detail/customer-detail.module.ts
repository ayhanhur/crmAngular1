import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from './../../components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { Routes, RouterModule } from '@angular/router';

import { CustomerDetailComponent } from './customer-detail.component';
import {CustomerService} from '../../services/customer.service';

const routes: Routes = [
    {
        path: ':id/profile',
        data: {
            title: 'Müşteri Kartı',
            urls: [{title: 'Müşteri Kartı', url: '/'}, {title: 'Müşteri Bilgileri'}, {title: 'Yeni Kart'}]
        },
        component: CustomerDetailComponent
    }
]


@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CustomerDetailComponent],
    providers: [
        CustomerService
    ]
})
export class CustomerDetailModule { }
