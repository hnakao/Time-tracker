import { Component, OnInit, Input } from '@angular/core';

import { Sticker } from '../../../@core/models/sticker';

@Component({
  selector: 'ngx-image-column',
  templateUrl: './image-column.component.html',
  styleUrls: ['./image-column.component.scss'],
})
export class ImageColumnComponent implements OnInit {

  @Input() value: any;    // This hold the cell value
  @Input() rowData: any;  // This holds the entire row object
  @Input() sticker: Sticker;

  constructor() { }

  ngOnInit() {
  }

}
