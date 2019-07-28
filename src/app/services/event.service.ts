import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import {JunocrmService} from './junocrm.service';
import {Customer} from '../classes/customer';
import {environment as Env} from './../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LocalStorageService} from 'angular-2-local-storage';

@Injectable()
export class EventService {

    constructor(
        private junoCrmService: JunocrmService,
        private httpClient: HttpClient,
        private localStorageService: LocalStorageService
    ) {
    }
    /** Params: @ActorID, @UserID */
    listEventsByActor(params: any) {
        return this.junoCrmService.executePost('jcsp_InvolvedActor_List_ByActor', params)
            .toPromise()
            .then(events => {
                return (events.Data.length > 0 ) ? events.Data.jcsp_InvolvedActor_List_ByActor : null;
            });
    }

    listEventByActorFull(params: any) {
        return this.junoCrmService.executePost('ogsp_InvolvedActor_List_ByActor', params)
            .toPromise()
            .then(events => {

                if(!events.Data) {
                    return false;
                }

                let eventList: any = events.Data.ogsp_InvolvedActor_List_ByActor
                if(eventList !== null){
                    let customers: any;
                    customers = [];
                    for(const i in eventList) {
                        const eventParams = [
                            {'Name': '@EventID', 'Value': eventList[i].EventID}
                        ];
                        this.junoCrmService.executePost('ogsp_InvolvedActor_List_ByEvent', eventParams)
                            .toPromise()
                            .then(involved => {
                                const cust = involved.Data.ogsp_InvolvedActor_List_ByEvent.filter( res => res.ActorID !== this.localStorageService.get('account')['personId']);
                                customers.push({
                                        'eventID': eventList[i].EventID,
                                        'event': eventList[i].Event_Event,
                                        'actorID': cust[0].ActorID,
                                        'name': cust[0].Actor_Descriptor}
                                );
                            });
                    }
                    return customers;
                }
            });
    }

    /** Params : @EventID, @Event, @EventType, @StartTime, @EndTime, @UserID, @ULanguageID  */
    findEvent(params: any) {
        return this.junoCrmService.executePost('ogsp_Event_Find', params);
    }

    /** Params : @ParentEventID, @ActorID, @UserID, @Event, @Explanation, @ULanguageID */
    saveEvent(params: any) {
        return this.junoCrmService.executePost('ogsp_Event_Save', params);
    }

    /** Params : @EventID, @BulkData='XML SET Orn.
                <ITEMS><ITEM InvolvedActorID="0" ActorID="" RoleID="0"></ITEMS>...', @UserID, @Code, @Status */
    saveEventInvolvedActors(params: any) {
        return this.junoCrmService.executePost('ogsp_InvolvedActor_Save', params);
    }

    /** Params: @EventID, @UserID, @ULanguageID */
    getEventActors(params: any) {
        return this.junoCrmService.executePost('ogsp_InvolvedActor_List_ByEvent', params);
    }

    /** Params  */
    getEventsByActor(params: any) {
      // return this.junoCrmService.executePost('ogsp_')
    }

    public setEventActorsXML(eventID: number, involvedActorID: number, actors: any): string {
        let xmlMarkup = '<ITEMS>';
        for (const i in actors) {
            if (actors[i].ActorID) {
                xmlMarkup += '<ITEM InvolvedActorID="0" ActorID="' + actors[i].ActorID + '" RoleID="' + actors[i].RoleID + '" />';
            }
        }
        xmlMarkup += '</ITEMS>';
        return xmlMarkup
    }


}
