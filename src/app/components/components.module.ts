import { RouterModule } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { LabelComponent } from './label/label.component';
import { UserCardComponent } from './user-card/user-card.component';
import { LeadTableComponent } from './lead-table/lead-table.component';
import { DailyScheduleComponent } from './daily-schedule/daily-schedule.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from './todo-list/todo-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CircleChartComponent } from './circle-chart/circle-chart.component';
import { SelectboxComponent } from './selectbox/selectbox.component';
import { AddTodoModalComponent } from './modals/add-todo-modal/add-todo-modal.component';
import { TimepickerComponent } from './timepicker/timepicker.component';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { TodolistService } from '../services/todolist.service';
import { LoaderIconComponent } from './loader-icon/loader-icon.component';
import { ContentPlaceholderComponent } from './content-placeholder/content-placeholder.component';
import { TypeaheadComponent } from './typeahead/typeahead.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgbModule.forRoot()
  ],
  declarations: [
      DailyScheduleComponent,
      LeadTableComponent,
      UserCardComponent,
      LabelComponent,
      TodoListComponent,
      DashboardComponent,
      CircleChartComponent,
      SelectboxComponent,
      AddTodoModalComponent,
      TimepickerComponent,
      DatepickerComponent,
      LoaderIconComponent,
      ContentPlaceholderComponent,
      TypeaheadComponent
    ],
  exports:[
      DailyScheduleComponent,
      LeadTableComponent,
      UserCardComponent,
      LabelComponent,
      TodoListComponent,
      DashboardComponent,
      SelectboxComponent,
      TimepickerComponent,
      DatepickerComponent,
      LoaderIconComponent,
      ContentPlaceholderComponent,
      TypeaheadComponent
    ],
  entryComponents: [
      AddTodoModalComponent
    ],
  providers: [
      TodolistService
    ]
})
export class ComponentsModule {
}
