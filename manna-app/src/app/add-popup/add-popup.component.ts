import { Component, EventEmitter, Inject, Input, OnInit, Type } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Address } from 'src/app/interfaces/address';
import { AddressAPIService } from 'src/app/api-services/addressapi.service';
import { AddPopupFormat, InputType } from './add-popup-format';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-popup.component.html',
  styleUrls: ['../nav/shared-styles/add-row.component.css']
})
export class AddPopupComponent implements OnInit{
constructor(public dialogRef: MatDialogRef<AddPopupComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private addressAPI: AddressAPIService) {}
  ngOnInit(): void {
    console.log(this.dataFieldsObj)
  }
  dataFieldsObj: AddPopupFormat[] = this.data.addPopupData;
  addFunction: Function = this.data.addFunction;


  sub!: Subscription;



  // address: Address = {
  //   delivery: false,
  //   address: "",
  //   phone: "",
  //   name: "",
  //   notes: ""
  // };
  toggleValue(d: AddPopupFormat) {
    d.value = !d.value;
  }

  onAdd = new EventEmitter();


  addFunctionClosePopup() {
    this.addFunction(this.dataFieldsObj, this.dialogRef)
  }



  // ngOnDestroy(): void {
  //   this.sub.unsubscribe();
  // }
}
