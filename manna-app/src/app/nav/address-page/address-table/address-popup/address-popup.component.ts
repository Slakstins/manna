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

  editName = false;
  nameTemp = this.data.name;

//   valEditComponentLabels: (keyof Address)[] = ["address" as keyof Address,
// "name" as keyof Address, "phone" as keyof Address, "notes" as keyof Address];


  updateNotes() {
    this.sub = this.addressAPI.setField(this.notesTemp, this.data._id, "notes").subscribe((_res: any) => {
      this.data.notes = this.notesTemp;
      this.dialogRef.close();
    },
    (error: any) => {
      console.log(error);
    });
  }





  toggleDelivery() {
    this.sub = this.addressAPI.setField(!this.data.delivery, this.data._id, "delivery").subscribe((_res: any) => {
      this.data.delivery = !this.data.delivery;
      console.log("successfully set");

    },
    (error: any) => {
      console.log(error);
    });
  }

  deleteClicked() {
    if(confirm("Are you sure you want to delete entry for: "+ this.data.name)) {
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

  discardNotesChanges() {
    this.notesTemp = this.data.notes;
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
