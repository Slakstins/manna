import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Address } from 'src/app/address';
import { AddressAPIService } from 'src/app/addressapi.service';

@Component({
  selector: 'app-address-table',
  templateUrl: './address-table.component.html',
  styleUrls: ['./address-table.component.css']
})
export class AddressTableComponent implements OnInit, OnDestroy{
  constructor(private addressAPI: AddressAPIService) {

  }
  rowsToDisplay = 10;

  page: number = 1;
  pageCount!: number;
  sub!: Subscription;
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  ngOnInit(): void {
    this.sub = this.addressAPI.get().subscribe((res) => {
      this.addresses = res;
      this.pageCount = (Math.floor( this.addresses.length / this.rowsToDisplay)) + 1;
      if (this.addresses.length % 10 == 0){
        this.pageCount -= 1;
      }
      console.log(this.addresses);
    },
    (error) => {
      console.log(error);
    })

  }
  addresses!: Address[];

  displayRowData(address: Address) {
    console.log(address);

  }
  prevPage() {
    this.page--;
  }

  nextPage() {
    this.page++;
  }

}
