import { TypeaheadService } from './../../../services/typeahead.service';
import {AuthenticationService} from './../../../services/authentication.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/merge';
import { Router } from '@angular/router';


@Component({
    selector: 'ma-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss'],
    providers: [TypeaheadService]
})
export class NavigationComponent implements OnInit {
    userName: string;
    userImage: string;
    @Output() actionEvent = new EventEmitter<{clickStatus:boolean}>();
    isOpen:boolean = false;
    searching:boolean = false;
    constructor(
        private userService: AuthenticationService,
        private typeService: TypeaheadService,
        private router: Router) {
    }



    formatter = (result: string) => result.split('@')[1];
    formatterRes = (result: string) => result.split('@')[1];
    search = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged().do(() => this.searching = true)
      .mergeMap(term => term === '' ? [] : this.typeService.searchCustomer(term)
      ).map(result => {
            let list = [];
            let res;
            for (res in result) {
              list.push(result[res]['id']+ '@' + result[res]['name'])
            }
            return list;
      } ).do(() => { this.searching = false;});

    ngOnInit() {

        this.userName = this.userService.getUserName();
        this.userImage = this.userService.getUserImage();

    }

    menuCollapse() {
        this.isOpen = !this.isOpen
        this.actionEvent.emit({clickStatus: this.isOpen });
    }

    logout() {
        this.userService.logout();
    }

    typeHandler(event) {
        this.router.navigate(['/customerdetail', event.item.split('@')[0], 'profile'])
    }

}
