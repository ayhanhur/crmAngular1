
import {
    Event as RouterEvent,
    NavigationCancel,
    NavigationEnd,
    NavigationError,
    NavigationStart,
    Router,
} from '@angular/router';

import { Component, OnInit,HostBinding} from '@angular/core';
import { slideInOutAnimation } from './../../animations/main';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  animations: [slideInOutAnimation],
})
export class IndexComponent implements OnInit {

  @HostBinding('class.mini-sidebar') get sidebarToggle() {
    return this.miniSideBarCss;
  } 
  menuState: string = 'out';
  isLoading: boolean = false;
  miniSideBarCss:boolean = false;
  private pageRouter: Router;
  constructor(private router: Router) {
    this.pageRouter = router;
   }
  
  ngOnInit() {

  }

  ngAfterViewInit() {
        this.pageRouter.events.subscribe((event: RouterEvent) => {
            this.setPageSpinner(event);
        });
    }

  setPageSpinner(event): void {
    if (event instanceof NavigationStart) {
      this.isLoading = true;
    }
    if (event instanceof NavigationEnd) {
      this.isLoading = false;
    }
    if (event instanceof NavigationCancel) {
      this.isLoading = false;
    }
    if (event instanceof NavigationError) {
      this.isLoading = false;
    }
	}

  catchEvent(event) {
    console.log(event);
    if(event.clicked == true) {
      this.toggleRightMenu('in');
    }
    else if(event.clicked == false){
      this.toggleRightMenu('out');
    }

  }

  toggleRightMenu(status)
  {
    switch(status) {
      case ('in'):
        this.menuState = 'in';
      break;
      case('out'):
        this.menuState = 'out';
      break;
    }
  }
  
  sideBarToggleListener(event) {
    return this.miniSideBarCss = event;
  }
}
