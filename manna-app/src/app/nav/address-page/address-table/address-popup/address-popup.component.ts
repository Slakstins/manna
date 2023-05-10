import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Address } from 'src/app/address';

@Component({
  selector: 'app-address-popup',
  templateUrl: './address-popup.component.html',
  styleUrls: ['./address-popup.component.css']
})
export class AddressPopupComponent {
  constructor(public dialogRef: MatDialogRef<AddressPopupComponent>, @Inject(MAT_DIALOG_DATA) public data: Address) {}

}
