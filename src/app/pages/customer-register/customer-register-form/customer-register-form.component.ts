import {LoaderService} from './../../../services/loader.service';

import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {References} from '../../../data/customer-register-form/references';
import {Interests} from '../../../data/customer-register-form/interests';
import {Reasons} from '../../../data/customer-register-form/reasons';
import {City} from '../../../data/customer-register-form/city';
import {InitialLead} from '../../../models/initial-lead'
import {CustomerRegisterService} from '../../../services/customer-register.service';
import {LocalStorageService} from 'angular-2-local-storage/dist';
import {CustomerService} from './../../../services/customer.service';
import {LeadTableComponent} from '../../../components/lead-table/lead-table.component';
import {DefinitionService} from '../../../services/definition.service';

@Component({
    selector: 'app-customer-register-form',
    templateUrl: './customer-register-form.component.html',
    styleUrls: ['./customer-register-form.component.scss'],
    providers: [CustomerRegisterService, CustomerService, LoaderService]
})
export class CustomerRegisterFormComponent implements OnInit {
    customerForm: FormGroup;
    references = References;
    interests = Interests;
    reasons = Reasons;
    city = City;
    customer: any;
    isLoading: boolean = false;
    showReferenceSearch = false;
    locationCountries: any;
    locationCities: any;
    locationDistricts: any;
    formModel: any;


    @Output() actionEvent = new EventEmitter<{ status: boolean }>();

    constructor(private formBuilderFactory: FormBuilder,
                private customerRegisterService: CustomerRegisterService,
                private customerService: CustomerService,
                private loaderService: LoaderService,
                private definitionService: DefinitionService,
                private localStorageService: LocalStorageService) {
        this.createForm();
    }

    ngOnInit() {

        this.locationDistricts = null;

        this.createForm();
        this.formModel = this.customerForm;

        this.loaderService.loaderIndicatorHandler.subscribe(loadStatus => {
            this.isLoading = loadStatus;
        });

        this.definitionService.getCountries()
            .then(countryResult => {
                this.locationCountries = countryResult;
                // this.formModel['country'].setValue(30225);
                (<FormControl>this.formModel.controls['country']).setValue(30225);

                this.definitionService.getLocationChildren(this.formModel.controls['country'].value)
                    .then(citiesResult => {
                        this.locationCities = citiesResult;
                    });
            });

    }

    createForm() {
        this.customerForm = this.formBuilderFactory.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            eMail: [''],
            phoneNumber: ['', Validators.required],
            reference: [''],
            interests: this.formBuilderFactory.array([]),
            reasons: this.formBuilderFactory.array([]),
            country: [''],
            city: [''],
            district: [''],
            address: ['']
        });
    }

    private prepareSaveCustomer() {

        const saveCustomer: InitialLead = {
            firstName: this.formModel.firstName as string,
            lastName: this.formModel.lastName as string,
            eMail: this.formModel.eMail as string,
            phoneNumber: this.formModel.phoneNumber as string,
            reference: this.formModel.reference as string,
            interests: this.formModel.interests as string[],
            reasons: this.formModel.reasons as string[],
            country: this.formModel.country as string[],
            city: this.formModel.city as string,
            district: this.formModel.district as string,
            address: this.formModel.address as string
        };

        const formModel = this.customerForm.value;

        const save = [
            { 'Name': '@Name', 'Value': formModel.firstName },
            { 'Name': '@Surname', 'Value': formModel.lastName },
            { 'Name': '@Code', 'Value': '' },
            { 'Name': '@Gender', 'Value': 0 },
            { 'Name': '@IdentityNumber', 'Value': 12345678900 },
            { 'Name': '@BirthDate', 'Value': '1970-01-01' },
            // { 'Name': '@Nationality', 'Value': '' },
            // { 'Name': '@BirthPlace', 'Value': '' },
            { 'Name': '@UserID', 'Value': this.localStorageService.get('account')['personId']}
        ];

        return save;
    }

    onChange(formArrayName: string, label: string, isChecked: boolean) {
        const formArray = <FormArray>this.customerForm.controls[formArrayName];

        if (isChecked) {
            formArray.push(new FormControl(label));
        } else {
            let i = formArray.controls.findIndex(x => x.value === label);
            formArray.removeAt(i);
        }
    }

    referenceDetail(event) {
        const showSearch: any = this.references.filter(res => res.title === event.target.value);
        this.showReferenceSearch = showSearch[0].showsearch;
    }

    onSubmit() {

        this.customer = this.prepareSaveCustomer();

        this.customerRegisterService.customerRegister(this.customer)
            .toPromise()
            .then(response => {

                const savedPersonID = response.Data.jcsp_Customer_Save[0].PersonID;
                const userID = this.localStorageService.get('account')['personId'];

                const formModel = this.customerForm.value;

                /** Adres Bilgileri */
                const customerAddressParams = [
                    {'Name': '@OwnerID', 'Value': savedPersonID },
                    {'Name': '@AddressType', 'Value': 346 },
                    {'Name': '@CountryID', 'Value': formModel.country},
                    {'Name': '@CityID', 'Value': formModel.city},
                    {'Name': '@DistrictID', 'Value': formModel.district},
                    {'Name': '@ZipCode', 'Value': 0},
                    {'Name': '@AddressDetail', 'Value': formModel.address },
                    {'Name': '@Status', 'Value': 14},
                    {'Name': '@UserID', 'Value': userID}
                ];

                this.customerService.customerSaveAddress(customerAddressParams)
                    .toPromise()
                    .then(addressResult => {
                        console.log(addressResult);
                    });

                /** İletişim bilgileri */
                const phoneParams = [
                    {'Name': '@OwnerID', 'Value': savedPersonID},
                    {'Name': '@ContactType', 'Value': 255},
                    {'Name': '@ContactText', 'Value': formModel.phoneNumber},
                    {'Name': '@UserID', 'Value': userID}
                ];

                const emailParams = [
                    {'Name': '@OwnerID', 'Value': savedPersonID},
                    {'Name': '@ContactType', 'Value': 254},
                    {'Name': '@ContactText', 'Value': formModel.eMail},
                    {'Name': '@UserID', 'Value': userID}
                ];

                this.customerService.customerSaveContact(phoneParams)
                    .toPromise()
                    .then(phoneResponse => {
                        console.log('Phone Saved...');
                    });

                this.customerService.customerSaveContact(emailParams)
                    .toPromise()
                    .then(emailResponse => {
                        console.log('Email Saved...');
                    });




                const eventParams = [
                    {'Name': '@ActorID ', 'Value': savedPersonID },
                    {'Name': '@Event', 'Value': 'Desk Görüşmesi'}
                ];

                this.customerRegisterService.customerSaveEvent(eventParams)
                    .toPromise()
                    .then(result => {

                    });
                this.isLoading = false;

            });

    }

    getDistricts(event){
        const cityID = event.target.value;
        this.definitionService.getLocationChildren(cityID)
            .then( districts => {
                this.locationDistricts = (districts.length > 0) ? districts : null;
            });
    }

    saveEvent(params){
        this.customerRegisterService.customerSaveEvent(params);
    }

}
