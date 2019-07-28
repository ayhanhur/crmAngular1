

import { LoaderService } from './services/loader.service';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule, Routes} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {StickyNavModule} from 'ng2-sticky-nav';
import {ComponentsModule} from './components/components.module';
import {LocalStorageModule} from 'angular-2-local-storage';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { CommonModule, HashLocationStrategy, Location, LocationStrategy} from '@angular/common';
import {AuthenticationService} from './services/authentication.service';
import {JunocrmService} from './services/junocrm.service';
import {EventService} from './services/event.service';
import {ModalService} from './services/modal.service';

import {NavigationComponent} from './shared/content/navigation/navigation.component';
import {SidebarComponent} from './shared/content/sidebar/sidebar.component';
import {BreadcrumbComponent} from './shared/components/breadcrumb/breadcrumb.component';
import {RightSidebarComponent} from './shared/content/right-sidebar/rightsidebar.component';
import {AppComponent} from './app.component';

import { UserGuard } from './guards/user.guard';

import {ToastModule, ToastOptions} from 'ng2-toastr';
import {CustomOption} from './shared/options/toasteroptions';
// Interceptors
import {JunocrmInterceptor} from './interceptors/junocrm.interceptor';
import {TimingInterceptor} from './interceptors/timing.interceptor';

import {IndexComponent} from './pages/index/index.component';
import {DropdownMenuComponent} from './components/dropdown-menu/dropdown-menu.component';
// User Roles
import { Roles as userRole } from './classes/roles';
import {LocationService} from './services/location.service';
import {StringtoimageComponent} from './components/stringtoimage/stringtoimage.component';
import {DefinitionService} from './services/definition.service';



const routes: Routes = [
    {
        path: '',
        component: IndexComponent,
        canActivate: [UserGuard],
        canActivateChild: [UserGuard],
        children: [
            {
                path:  '',
                pathMatch: 'full',
                redirectTo: 'customer-register'
            },
            {
                path: 'customer',
                loadChildren: 'app/pages/customer/customer.module#CustomerModule',
                data: {userRoles: [userRole.ROLE_DESK, userRole.ROLE_SUPER_ADMIN ] }
            },
            {
                path: 'customer-register',
                loadChildren: 'app/pages/customer-register/customer-register.module#CustomerRegisterModule',
                data: {userRoles: [userRole.ROLE_DESK, userRole.ROLE_SUPER_ADMIN ] }
            },
            {
                path: 'customer-interview-card',
                loadChildren: 'app/pages/customer-interview-card/customer-interview-card.module#CustomerInterviewCardModule',
                data: {userRoles: [userRole.ROLE_DESK, userRole.ROLE_SALESMAN, userRole.ROLE_SUPER_ADMIN ] }

            },
            {
                path: 'salesman',
                loadChildren: 'app/pages/salesman/salesman.module#SalesmanModule',
                data: {userRoles: [userRole.ROLE_SALESMAN, userRole.ROLE_SUPER_ADMIN ] }
            },
            {
                path: 'leads',
                loadChildren: 'app/pages/leads/leads.module#LeadsModule',
                data: {userRoles: [userRole.ROLE_SALESMAN, userRole.ROLE_SUPER_ADMIN ] }
            },
            {
                path: 'desk',
                loadChildren: 'app/pages/desk/desk.module#DeskModule',
                data: {userRoles: [userRole.ROLE_DESK, userRole.ROLE_SUPER_ADMIN ] }
            },
            {
                path: 'customerdetail',
                loadChildren: 'app/pages/customer-detail/customer-detail.module#CustomerDetailModule',
                data: {userRoles: [userRole.ROLE_DESK, userRole.ROLE_SUPER_ADMIN ] }
            }
        ]
    },
    {
        path: 'login',
        loadChildren: 'app/pages/login/login.module#LoginModule'
    }
];

@NgModule({
    declarations: [
        AppComponent,
        IndexComponent,
        NavigationComponent,
        BreadcrumbComponent,
        SidebarComponent,
        RightSidebarComponent,
        DropdownMenuComponent,
        StringtoimageComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        HttpClientModule,
        ComponentsModule,
        StickyNavModule,
        CommonModule,
        ToastModule.forRoot(),
        LocalStorageModule.withConfig({
            prefix: 'juno',
            storageType: 'localStorage'
        }),
        RouterModule.forRoot(routes),
        NgbModule.forRoot()
    ],
    providers: [
        LoaderService,
        UserGuard,
        AuthenticationService,
        EventService,
        LocationService,
        ModalService,
        DefinitionService,
        JunocrmService,
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JunocrmInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TimingInterceptor,
            multi: true
        },
        {provide: ToastOptions, useClass: CustomOption},
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
