import { Component, OnInit, Input } from '@angular/core';
import { GlobalService } from '../../../@core/data/global.service';

@Component({
  selector: 'ngx-vumark-image',
  templateUrl: './vumark-image.component.html',
  styleUrls: ['./vumark-image.component.scss'],
})
export class VumarkImageComponent implements OnInit {

  @Input() vumark: string;
  @Input() logo: string;

  constructor(private global: GlobalService) { }

  ngOnInit() {
    this.vumark = `${this.global.apiUrl()}${this.vumark}`;
  }

}
