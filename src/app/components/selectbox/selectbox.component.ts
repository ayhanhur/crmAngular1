import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-selectbox',
  templateUrl: './selectbox.component.html',
  styleUrls: ['./selectbox.component.scss']
})
export class SelectboxComponent implements OnInit {
  @Input() defaultValue: string;
  @Input() values: string[];
  @Input() id: string;
  @Output() selectedValueChanged: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onSelect(value: string) {
    this.selectedValueChanged.emit(value);
  }

}
