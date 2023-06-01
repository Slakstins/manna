import { Component, EventEmitter, Inject, Input, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Address } from 'src/app/interfaces/address';
import { AddressAPIService } from 'src/app/api-services/addressapi.service';

@Component({
  selector: 'app-row-popup',
  templateUrl: './row-popup.component.html',
  styleUrls: ['./row-popup.component.css']
})
export class RowPopupComponent implements OnDestroy {
  constructor(public dialogRef: MatDialogRef<RowPopupComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }


  sub!: Subscription;
  notesTemp = this.data.model.notes;
  onDel = new EventEmitter();

  editName = false;
  nameTemp = this.data.model.name;

  // valEditComponentLabels: Object[] = ["address",
    // "name", "phone", "notes"];

  valEditComponentConfs: any[] = [
    {label: "address",
    type: "string"},
    {label: "name",
    type: "string"},
    {label: "phone",
    type: "string"},
    {label: "notes",
    type: "string"},
    {label: "delivery",
    type: "check"},
  ]
  setAddrField(field: string, val: any) {
    (this.data.model as any)[field] = val;
  }


  deleteClicked() {
    if (confirm("Are you sure you want to delete entry for: " + this.data.model.name)) {
      this.deleteDelivery();
    }
  }

  deleteDelivery() {
    this.sub = this.data.API.delete(this.data.model._id).subscribe((res: any) => {
      console.log("deletion successful");
      this.onDel.emit(this.data.model._id);
      this.dialogRef.close();
    },
      (error: any) => {
        console.log(error);
      });
  }


  ngOnDestroy(): void {
    if (this.sub){
      this.sub.unsubscribe();
    }
  }
}
