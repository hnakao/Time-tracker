import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  template: `
  <div class="row">
    <div class="col-md-12">
      <nb-action icon="fas fa-eye" (click)="onView()"></nb-action>
    </div>
  </div>
  `,
})
export class InstanceActionsComponent implements OnInit {
  @Input() value: any;    // This hold the cell value
  @Input() rowData: any;  // This holds the entire row object
  @Output() view = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  onView() {
    this.view.emit(this.rowData);
  }

}
