import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Address } from 'src/app/address';
import { AddressAPIService } from 'src/app/addressapi.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddressPopupComponent } from './address-popup/address-popup.component';
import { AddAddressComponent } from './add-address/add-address.component';


@Component({
  selector: 'app-address-table',
  templateUrl: './address-table.component.html',
  styleUrls: ['./address-table.component.css']
})
export class AddressTableComponent implements OnInit, OnDestroy {
  constructor(private addressAPI: AddressAPIService, public dialog: MatDialog) {

  }
  options = [{ description: "any", id: 0 }, { description: "name", id: 1 }, { description: "address", id: 2 }, { description: "phone", id: 3 }, { description: "notes", id: 4 }
  ];
  searchText = "";
  rowsToDisplay = 10;
  page: number = 1;
  public pageCount!: number;
  sub!: Subscription;
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  searchField = "any";
  ngOnInit(): void {
    this.sub = this.addressAPI.get().subscribe((res) => {
      this.addresses = res;
      this.pageCount = (Math.floor(this.addresses.length / this.rowsToDisplay)) + 1;
      if (this.addresses.length % 10 == 0) {
        this.pageCount -= 1;
      }
      console.log(this.addresses);
    },
      (error) => {
        console.log(error);
      })

  }
  addresses!: Address[];

  displayAddAddress() {
    let dialogRef = this.dialog.open(AddAddressComponent);
    //subscribe to events!!
    const sub = dialogRef.componentInstance.onAdd.subscribe((address) => {
      this.addAddressTableData(address);
      // do something
    });
    dialogRef.afterClosed().subscribe(() => {
      sub.unsubscribe();
    });
  }

  addAddressTableData(address: Address) {
    this.addresses.push(address);
  }

  removeAddressTableData(id: string){
    this.addresses = this.addresses.filter((address) => {
      return address._id != id;
    })
  }

  displayRowData(address: Address) {
    console.log(address);
    let dialogRef = this.dialog.open(AddressPopupComponent, {
      data: address,
    });
    const sub = dialogRef.componentInstance.onDel.subscribe((id) => {
      this.removeAddressTableData(id);
      // do something
    });
    dialogRef.afterClosed().subscribe(() => {
      sub.unsubscribe();
    });
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
    }
  }

  nextPage() {
    if (this.page < this.pageCount) {
      this.page++;
    }
  }
  goToFirstPage() {
    this.page = 1;
  }
  setSearchField(field: string) {
    console.log("search field set to: " + field);
    this.searchField = field;
  }

}
