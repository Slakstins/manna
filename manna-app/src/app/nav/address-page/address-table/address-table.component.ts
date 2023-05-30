import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Address } from 'src/app/interfaces/address';
import { AddressAPIService } from 'src/app/api-services/addressapi.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddressPopupComponent } from './address-popup/address-popup.component';
import { AddPopupComponent } from '../../../add-popup/add-popup.component';
import { AddPopupFormat, InputType } from 'src/app/add-popup/add-popup-format';


@Component({
  selector: 'app-address-table',
  templateUrl: './address-table.component.html',
  styleUrls: ['../../shared-styles/table.component.css']
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
    let dialogRef = this.dialog.open(AddPopupComponent, {
      data: {
        addPopupData: this.addPopupData,
        addFunction: this.addAddress
      }
    });
    //subscribe to events!!
    // const sub = dialogRef.componentInstance.onAdd.subscribe((address) => {
      // this.addAddressTableData(address);
      // dialogRef.close();
      // do something
    // });
    // dialogRef.afterClosed().subscribe(() => {
    //   sub.unsubscribe();
    // });
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

  addAddress = (d: AddPopupFormat[], dialogRef: MatDialogRef<AddPopupComponent>) => {
    //convert to address format
    let a : Address = {address: "", delivery: false, name: "", notes: "", phone: ""};
    for(let field of d) {
      this.update(field.label as keyof(Address), a, field.value );
    }
    //call api
    this.sub = this.addressAPI.post(a).subscribe((res) => {
      console.log("successfully added");
      // alert(res.toString());
      //add the id to address!!
      this.addresses.push(res as Address)
      // this.onAdd.emit(this.address);
      // this.dialogRef.close();
      dialogRef.close();
    },
    (error) => {
      console.log(error);
    });
  } 



    update<Key extends keyof Address>(key: Key, a: Address[Key], value: any) {
      a[key] = value;
  }

  addPopupData: AddPopupFormat[] = [
    {
    label: "name",
    type: InputType.Text,
    value: ""
    },
    {
    label: "address",
    type: InputType.Text,
    value: ""
    },
    {
    label: "phone",
    type: InputType.Text,
    value: ""
    },
    {
    label: "notes",
    type: InputType.Text,
    value: ""
    },
    {
    label: "delivery",
    type: InputType.Check,
    value: false
    },
]

}
