import { Component, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Address } from 'src/app/address';
import { AddressAPIService } from 'src/app/addressapi.service';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.css']
})
export class AddAddressComponent {
constructor(public dialogRef: MatDialogRef<AddAddressComponent>, private addressAPI: AddressAPIService) {}


  sub!: Subscription;

  address: Address = {
    delivery: false,
    address: "",
    phone: "",
    name: "",
    notes: ""
  };

  onAdd = new EventEmitter();


  addAddress() {
    alert(this.address.delivery)
    this.sub = this.addressAPI.post(this.address).subscribe((res) => {
      console.log("successfully added");
      // alert(res.toString());
      //add the id to address!!
      this.address = res as Address;
      this.onAdd.emit(this.address);
      this.dialogRef.close();
    },
    (error) => {
      console.log(error);
    });
  }

  toggleDelivery() {
    this.address.delivery = !this.address.delivery;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
