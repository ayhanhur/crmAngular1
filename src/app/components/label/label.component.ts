import {Component, Input, Output, OnInit} from '@angular/core';
import {Label} from './label.mock';

@Component({
    selector: 'app-label',
    templateUrl: './label.component.html',
    styleUrls: ['./label.component.scss']
})



export class LabelComponent implements OnInit {

    @Input() theme: string;
    @Input() text: string;
    @Input() labels: any;

    themeLabels: any = [];
    constructor() {
    }

    ngOnInit() {

        if (this.labels.length > 0) {

            for (const i in this.labels) {
                if (this.labels[i]) {
                    for (const j in Label) {
                        if (Label[j].label === this.labels[i]) {
                            this.themeLabels.push({
                                'text': this.labels[i],
                                'theme': Label[j].theme
                            });
                        }
                    }
                }
            }
        }

    }

}
