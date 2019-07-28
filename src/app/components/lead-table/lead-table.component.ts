import {Component, OnInit, Input, Output, ViewContainerRef} from '@angular/core';
import {CustomerService} from '../../services/customer.service';
import {AuthenticationService} from '../../services/authentication.service';
import {LoaderService} from './../../services/loader.service';
import {LocalStorageService} from 'angular-2-local-storage/dist';
import {Customer, JCustomer} from '../../classes/customer';
import {User} from '../../classes/user';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import {EventService} from '../../services/event.service';
import {LocationService} from '../../services/location.service';
import {DefinitionService} from '../../services/definition.service';
import {assign} from 'rxjs/util/assign';


@Component({
    selector: 'app-lead-table',
    templateUrl: './lead-table.component.html',
    styleUrls: ['./lead-table.component.scss'],
    providers: [CustomerService, User]
})


export class LeadTableComponent implements OnInit {

    @Input() showRepresantSelect: boolean;

    customers: Customer;
    jcustomers: JCustomer;
    customerList: any;
    represant: User;
    represantRoleID = 3;
    isLoading = false;
    represantId: number;
    customerId: any;
    customerToRepresant: any;
    params: any;
    facilities: any;
    eventParams: any;


    constructor(private customerService: CustomerService,
                private authenticationService: AuthenticationService,
                private localStorageService: LocalStorageService,
                private eventService: EventService,
                private definitionService: DefinitionService,
                public toastr: ToastsManager,
                vcr: ViewContainerRef,
                private loaderService: LoaderService) {
        this.toastr.setRootViewContainerRef(vcr);
    }

    ngOnInit() {
        this.customerToRepresant = {
            'represant': null,
            'eventID': null,
            'customers': []
        };
        this.customerId = null;
        this.customers = null;
        this.represant = null;
        this.eventParams = [];

        const personalParams = [
            {
                'Name': '@EmployerID',
                'Value': 513867
            }
        ];

        const eventParams = [
            {
                'Name': '@EventID',
                'Value': 513917
            }
        ];

        this.customerService.getPersonal(personalParams)
            .toPromise()
            .then(response => {
                const personnelList = response.Data.ogsp_Personnel_List_ByEmployer;
                this.represant = personnelList.filter(personnel => personnel.Staff_Descriptor.indexOf('Müşteri Temsilcisi') > -1  );
            });


        this.getActorEvents();

    }

    getActorEvents(){

        const customerParams = [{
            'Name': '@ActorID',
            'Value': this.localStorageService.get('account')['personId'],
        }];

        this.loaderService.loaderIndicatorHandler.subscribe(loadStatus => {
            this.isLoading = loadStatus;
        });

        this.eventService.listEventByActorFull(customerParams)
            .then(customers => {
                this.customerList =  customers;
                this.isLoading = false;
            });

    }

    customerIsChecked(event, eventID) {
        if (event.target.checked) {
            const eventAssignParams = {
                    'EventID': eventID,
                    'Actors': [
                        {'ActorID': Number(event.target.value), 'RoleID': 0},
                        {'ActorID': this.localStorageService.get('account')['personId'], 'RoleID': 0}
                    ]
                };
            this.eventParams.push(eventAssignParams);
        } else {
            this.eventParams = this.eventParams.filter(res => res.EventID !== eventID);
        }
    }

    removeCustomerFromList(customer_id){
        for(const i in this.customers){
            if(this.customers[i].id.indexOf(customer_id) > -1){
                delete this.customers[i];
            }
        }
    }

    assignCustomerToRepresant(){

        if (!this.customerToRepresant.represant) {
            this.toastr.error('Müşteri temsilcisi seçmelisiniz!');
            return;
        } else if(this.eventParams.length === 0){
            this.toastr.error('Atama yapmak için en az bir müşteri seçmelisiniz!');
            return;
        } else {

            for(const i in this.eventParams){
                if (this.eventParams[i]) {
                    this.eventParams[i].Actors.push({'ActorID': Number(this.customerToRepresant.represant), 'RoleID': 0});
                }
            }

            for (const i in this.eventParams) {
                if (this.eventParams[i]) {

                    const assignEventParams = [
                        {'Name': '@ParentEventID', 'Value': this.eventParams[i].EventID},
                        {'Name': '@Event', 'Value': 'Desk görüşmesi ataması'},
                        {'Name': '@Code', 'Value': 0},
                        {'Name': '@Status', 'Value': 14}
                    ];

                    /*
                    this.eventService.saveEvent(assignEventParams)
                        .toPromise()
                        .then( eventResult => {
                            const eventID = eventResult.Data.ogsp_Event_Save.EventID;
                            const eventActorSaveParams = [
                                {'Name': '@EventID', 'Value': eventID},
                                {'Name': '@BulkData', 'Value': this.eventParams[i].Actors}
                            ];
                            console.log(eventActorSaveParams);

                            /*this.eventService.saveEventInvolvedActors(eventActorSaveParams)
                                .toPromise()
                                .then(involvedRes => {
                                    console.log(involvedRes);
                                });
                    });*/
                }
            }
        }

    }


}

