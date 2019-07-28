import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ma-rightsidebar',
  templateUrl: './rightsidebar.component.html',
	styleUrls: ['./rightsidebar.component.scss']

})
export class RightSidebarComponent {
	@Output() actionEvent = new EventEmitter<{clicked:boolean}>();
	constructor() {}
	ngOnInit() {
		
	}

	clickEvent(event) {
			this.actionEvent.emit({clicked:false});
	}
} 
