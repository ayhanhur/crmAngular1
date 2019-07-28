import {AuthenticationService} from '../../../services/authentication.service';
import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'ma-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    userName: string;

    constructor(private userService: AuthenticationService) {
    }

    ngOnInit() {

        this.userName = this.userService.getUserName();


    }
    logout() {
        this.userService.logout();
    }
}
