import {Injectable} from '@angular/core';
import { Observable } from 'rxjs/Rx';
import {JunocrmService} from './junocrm.service';
import {Customer} from '../classes/customer';
import {environment as Env} from './../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class DefinitionService {

    constructor(
        private junoCrmService: JunocrmService,
        private httpClient: HttpClient
    ) {
    }

    /**  Ülke Listesi Getir */
    getCountries() {
      const countryParams = [
          {'Name': '@Type', 'Value': 266 }
      ];

      return this.junoCrmService.executePost('ogsp_Location_List_ByType', countryParams)
            .toPromise()
            .then(cities => {
                return cities.Data.ogsp_Location_List_ByType;
            });
    }

    /** Lokasyon child data getir @CountryID > City > District gibi...  */
    getLocationChildren(parentID: number) {
        const cityParams = [
            {'Name': 'ParentLocationID', 'Value': parentID}
        ];
        return this.junoCrmService.executePost('ogsp_Location_List', cityParams)
            .toPromise()
            .then(childData => {
              return childData.Data.ogsp_Location_List;
            });
    }

    /** Bölüm listesi getir */
    facilityListByLocation(params){
        return this.junoCrmService.executePost('ogsp_Facility_List_ByLocation', params)
            .toPromise()
            .then(facility => {
                return (facility.Data.length > 0) ? facility.Data.ogsp_Facility_List_ByLocation : null;
            });
    }



}
