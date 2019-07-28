
import {Injectable} from '@angular/core';
import {JunocrmService} from './junocrm.service';

@Injectable()
export class CustomerRegisterService {

    constructor(
        private junoCrmService: JunocrmService
        ) {
    }

    customerRegister(params: any) {
        return this.junoCrmService.executePost('jcsp_Customer_Save', params);
    }

    customerSaveEvent(params: any) {
        return this.junoCrmService.executePost('jcsp_Event_Save', params);
    }


}
