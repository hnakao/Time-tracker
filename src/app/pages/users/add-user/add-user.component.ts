

import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { UserT } from '../../../@core/models/userT';
import { UserService } from '../../../@core/data/users.service';


@Component({
  selector: 'ngx-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {


  user: UserT;
  t_form: string;

  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};


  @Output() save = new EventEmitter();

  constructor(private activeModal: NgbActiveModal,
              private userService: UserService) {
    if (!this.user) {
      this.user = new UserT('', '', '', '');
    }
  }

  ngOnInit() {
  }

  closeModal() {
    this.activeModal.close();
  }

/*   readThis(inputValue: any): void {
    const file: File = inputValue.files[0];
    const myReader: FileReader = new FileReader();

    // myReader.onloadend = (e) => {
    //   this.project.logoBase64 = myReader.result.toString();
    // };
    // myReader.readAsDataURL(file);
  } */

  onSubmit() {
    let find = false;
    for (const user of this.userService.data) {
      if (user.user_name === this.user.user_name ) {
        this.userService.updateUserT(this.user).subscribe( data => {
          this.closeModal();
          this.onSave();
        });
        find = true;
        break;
      }
    }
    if (!find) {
      this.userService.createUserT(this.user).subscribe( data => {
        this.closeModal();
        this.onSave();
       });
    }
 }

  onSave() {
    this.save.emit();
  }
/*

    // MultiSelect
    onItemSelect(item: any) {
      console.log(item);
    //  this.multiDropdown.pushSelectedItems(item);
    }

    onSelectAll(item: any) {
      console.log(item);
    // this.multiDropdown.pushSelectedItems(this.dropdownList);
    }
*/
}
