import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { MediaService } from '../../../@core/data/media.service';

@Component({
  selector: 'ngx-media-list',
  templateUrl: './media-list.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class MediaListComponent implements OnInit {

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
      id: {
        title: 'ID',
        type: 'any',
        filter: false,
      },
      views: {
        title: 'Views',
        type: 'number',
        filter: false,
      },
      rating: {
        title: 'Rating',
        type: 'number',
        filter: false,
      },
      dateModified: {
        title: 'Date Modified',
        type: 'date',
        filter: false,
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: MediaService) {
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
