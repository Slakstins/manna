import { Component, EventEmitter, Inject, Input, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Address } from 'src/app/address';
import { AddressAPIService } from 'src/app/addressapi.service';

@Component({
  selector: 'app-address-popup',
  templateUrl: './address-popup.component.html',
  styleUrls: ['./address-popup.component.css']
})
export class AddressPopupComponent implements OnDestroy{
  constructor(public dialogRef: MatDialogRef<AddressPopupComponent>, @Inject(MAT_DIALOG_DATA) public data: Address, private addressAPI: AddressAPIService) {}


  sub!: Subscription;

  notesTemp = this.data.notes;


  onDel = new EventEmitter();


  updateDelivery(val: Boolean) {
    this.data.delivery = val as boolean;
    this.sub = this.addressAPI.setDelivery(val, this.data._id).subscribe((res) => {
      console.log("successfully set");

    },
    (error) => {
      console.log(error);
    });
  }

  deleteClicked() {
    if(confirm("Are you sure to delete "+ this.data.name)) {
      this.deleteDelivery();
  }

  }


  deleteDelivery() {
    this.sub = this.addressAPI.delete(this.data._id).subscribe((res) => {
      console.log("deletion successful");
      this.onDel.emit(this.data._id);
      this.dialogRef.close();
    },
    (error) => {
      console.log(error);
    });
  }

  updateNotes() {
    this.data.notes = this.notesTemp;
    this.sub = this.addressAPI.setNotes(this.notesTemp, this.data._id).subscribe((res) => {
      console.log("successfully set");
    },
    (error) => {
      console.log(error);
    });
  }

  discardNotesChanges() {
    this.notesTemp = this.data.notes;
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
