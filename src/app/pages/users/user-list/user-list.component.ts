import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { UserService } from '../../../@core/data/users.service';

@Component({
  selector: 'ngx-user-list',
  templateUrl: './user-list.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class UserListComponent implements OnInit {

  settings = {
    hideSubHeader: true,
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    columns: {

      picture: {
        title: 'Picture',
        type: 'html',
        valuePrepareFunction: (value) => ( `<img src="` + value + `" />` ),
        filter: false,
      },
      name: {
        title: 'Name',
        type: 'number',
        filter: false,
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: UserService) {
    const data = this.service.getData();
    this.source.load(data);
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  ngOnInit() {
  }

}
