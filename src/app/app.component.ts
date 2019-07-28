import { AuthenticationService } from './services/authentication.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
    constructor(
        private authService: AuthenticationService,
        private router: Router
      ) {
          this.authService.isLoggedIn$.subscribe(isLoggedIn => {
            if(isLoggedIn) {
              this.router.navigate(['customer-register']);
            } else {
              this.router.navigate(['login']);
          }
      })
    }

}

