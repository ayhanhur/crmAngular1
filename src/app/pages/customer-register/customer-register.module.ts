import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {CustomerRegisterComponent} from './customer-register.component';
import {CustomerRegisterFormComponent} from './customer-register-form/customer-register-form.component';
import {ComponentsModule} from './../../components/components.module';


const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Müşteri Kayıt',
            urls: [{title: 'Dashboard', url: '/'}, {title: 'Müşteri Kayıt'}, {title: 'Yeni Kayıt'}]
        },
        component: CustomerRegisterComponent
    }
]

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        ComponentsModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        NgbModule.forRoot()
    ],
    declarations: [CustomerRegisterComponent, CustomerRegisterFormComponent]
})
export class CustomerRegisterModule {
}
