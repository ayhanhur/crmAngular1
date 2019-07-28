import { Component, OnInit, Input, Output } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';


@Component({
  selector: 'app-base64image',
  templateUrl: './stringtoimage.component.html',
  styleUrls: ['./stringtoimage.component.scss']
})
export class StringtoimageComponent implements OnInit {

  @Input() imagesrc: string;
  base64Image: any;

  constructor(
      public domSanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    if (this.imagesrc) {
      this.base64Image = 'data:image/svg+xml;base64,' + this.imagesrc; // this.domSanitizer.bypassSecurityTrustHtml(this.imagesrc);
      // console.log(this.base64Image);
    }
  }

}
