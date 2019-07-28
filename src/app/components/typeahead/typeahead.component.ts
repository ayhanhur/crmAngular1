import { Router } from '@angular/router';
import { LoaderService } from '../../services/loader.service';
import { TypeaheadService } from './../../services/typeahead.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';



@Component({
  selector: 'app-typeahead',
  templateUrl: './typeahead.component.html',
  styleUrls: ['./typeahead.component.scss'],
})
export class TypeaheadComponent implements OnInit {
  model: any;
  searching = false;
  searchResult;
  @Input() placeholder:string = '';
  @Input() isPromising:boolean = false;
  @Input() spinnerTheme?: {size?: string, theme?: string}
  @Input() formatter;
  @Input() formatterResult;
  constructor(
      public typeService: TypeaheadService,
      public loaderService: LoaderService
  ){
   }

  @Input() set search(term) {
    this.searchResult = term;
  }

  @Input() get typeaheadData() {
    return this.searchResult;
  }
  @Output() actionResult = new EventEmitter();

  ngOnInit() {
  }

  onKeyUp(event) {
    this.actionResult.emit(event);
  }


}  
