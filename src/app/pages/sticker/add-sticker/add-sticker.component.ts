import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Sticker } from '../../../@core/models/sticker';
import { StickerService } from '../../../@core/data/sticker.service';

@Component({
  selector: 'ngx-add-sticker',
  templateUrl: './add-sticker.component.html',
  styleUrls: ['./add-sticker.component.scss'],
})
export class AddStickerComponent implements OnInit {

  logo: string;
  sticker: Sticker;
  @Output() save = new EventEmitter();

  constructor(private activeModal: NgbActiveModal,
    private stickerService: StickerService) {
    if (!this.sticker) {
      this.sticker = new Sticker('', 0, '');
    }
  }

  ngOnInit() {
  }

  closeModal() {
    this.activeModal.close();
  }

  selectedFile(event) {
    this.logo = event.target.value;
    const temp = this.logo.split('\\');
    this.logo = temp[temp.length - 1];

    this.readThis(event.target);
  }

  readThis(inputValue: any): void {
    const file: File = inputValue.files[0];
    const myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.sticker.logoBase64 = myReader.result.toString();
    };
    myReader.readAsDataURL(file);
  }

  onSubmit() {
    if (this.sticker._id) {
      this.stickerService.updateSticker(this.sticker).subscribe( data => {
        this.closeModal();
        this.onSave();
      });
    } else {
      this.stickerService.createSticker(this.sticker).subscribe( data => {
        this.closeModal();
        this.onSave();
      });
    }
  }

  onSave() {
    this.save.emit();
  }
}
