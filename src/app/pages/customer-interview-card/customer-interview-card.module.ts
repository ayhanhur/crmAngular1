import { ComponentsModule } from './../../components/components.module';
import {FormsModule, ReactiveFormsModule, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerInterviewCardComponent } from './customer-interview-card.component';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Müşteri Görüşme Kartı',
            urls: [{title: 'Müşteri Kayıt', url: '/'}, {title: 'Müşteri Görüşme Kartı'}, {title: 'Yeni Kart'}]
        },
        component: CustomerInterviewCardComponent
    }
]


@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CustomerInterviewCardComponent]
})
export class CustomerInterviewCardModule { }
