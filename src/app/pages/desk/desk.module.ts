
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DeskComponent } from './desk.component';
import { ComponentsModule } from '../../components/components.module';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Banko Görevlisi',
      urls: [{title: 'Dashboard',url: '/'},{title:'Banko Görevlisi'},{title: 'Anasayfa'}]
    },
    component: DeskComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DeskComponent]
})
export class DeskModule { }
