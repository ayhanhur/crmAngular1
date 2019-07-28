import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-loader-icon',
  templateUrl: './loader-icon.component.html',
  styleUrls: ['./loader-icon.component.scss']
})
export class LoaderIconComponent implements OnInit {
  @Input() loader:{size:string,theme:string};
  constructor() { }

  ngOnInit() {
  }

}
