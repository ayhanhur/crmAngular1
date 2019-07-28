import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.scss']
})
export class DropdownMenuComponent implements OnInit {
  @Input() icon:string = 'user-circle-o';
  @Input() iconSize:string = 'fa-2x';
  @Input() type:string = 'icon';
  @Input() btnClass:string = 'primary'
  @Input() btnText:string = 'Göster'
  constructor() { }

  ngOnInit() {
  }

}
