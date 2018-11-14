import { Component, OnInit } from '@angular/core';
import { Sticker } from '../../../@core/models/sticker';

@Component({
  selector: 'ngx-sticker',
  templateUrl: './sticker.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class StickerComponent implements OnInit {

  selectedSticker: Sticker = null;

  constructor() { }

  ngOnInit() {
  }

  selectSticker(event) {
    this.selectedSticker = event;
  }

  unselectSticker() {
    this.selectedSticker = null;
  }

}
