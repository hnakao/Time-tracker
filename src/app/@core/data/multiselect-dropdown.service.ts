import { DropdownButtonsComponent } from './../../pages/ui-features/buttons/dropdown-buttons/dropdown-button.component';
import { Injectable } from '@angular/core';


@Injectable()

export class MultiselectDropdownService {

  dropdownList = [
    { item_id: 1, item_text: 'Orlando' },
    { item_id: 2, item_text: 'Nick Jones' },
    { item_id: 3, item_text: 'Hiroshi' },
    { item_id: 4, item_text: 'Neberton' },
    { item_id: 5, item_text: 'Carlos' },
  ];

  selectedItems = [
    { item_id: 3, item_text: 'Manuel' },
    { item_id: 4, item_text: 'Alejandro' }
  ];

  dropdownSettings = {
    singleSelection: false,
    idField: 'item_id',
    textField: 'item_text',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 5,
    allowSearchFilter: true,
  };

  getDropdownList() {
    return this.dropdownList;
  }

  getDropdownSettings() {
    return this.dropdownSettings;
  }

  getSelectedItems() {
    return this.selectedItems;
  }

  pushSelectedItems(selectedItems: any) {
    this.dropdownList.push(selectedItems);
  }
}