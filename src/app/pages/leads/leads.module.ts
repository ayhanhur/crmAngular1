import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from './../../components/components.module';
import { LeadpageComponent } from './leadpage.component';


const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Lead Kayıtları',
            urls: [{title: 'Dashboard', url: '/'},{title: 'Lead Kayıtları'}, {title: 'Lead Kayıtları'}]
        },
        component: LeadpageComponent
    }
]

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    RouterModule.forChild(routes),
    NgbModule.forRoot()
  ],
  declarations: [LeadpageComponent]
})
export class LeadsModule { }
