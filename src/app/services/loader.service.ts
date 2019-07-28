import {BehaviorSubject} from 'rxjs/Rx';
import {Injectable} from '@angular/core';

@Injectable()
export class LoaderService {

    loaderIndicatorHandler: BehaviorSubject<boolean> = new BehaviorSubject(false);

    // @Output() loaderIndicatorHandler = new EventEmitter<{isLoaded:boolean}>();

    constructor() {
        this.loaderIndicatorHandler.subscribe(result => {
            // console.log("Loader Result", result);
        })
    }

    updateIndicator(isLoaded: boolean) {
        this.loaderIndicatorHandler.next(isLoaded);
    }

}