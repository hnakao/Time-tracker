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
  titleForm: string;

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

  onSubmit() {
    let find = false;
    for (const user of this.userService.data) {
      if (user.userName === this.user.userName ) {
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

}
