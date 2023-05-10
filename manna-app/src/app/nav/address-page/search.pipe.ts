import { Pipe, PipeTransform } from '@angular/core';
import { Address } from 'src/app/address';
import { AddressTableComponent } from './address-table/address-table.component';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(addresses: Address[], searchText: string, searchField: string, page: number, atc: AddressTableComponent): Address[] {
    if (addresses == null) {
      this.updatePageCount(addresses, atc);
      return addresses;
    }
    else if (searchText.trim() == "") {
      this.updatePageCount(addresses, atc);
      return addresses.slice((page - 1) * 10, (page) * 10);
    }
    else {
      var filtered = addresses.filter((address) => {
        return address[searchField as keyof Address].includes(searchText.trim())
      })
      this.updatePageCount(filtered, atc);
      return filtered.slice((page - 1) * 10, (page) * 10);

    }
  }

  updatePageCount(addresses: Address[], atc: AddressTableComponent) {
    if (addresses == undefined){
      return;
    }
      atc.pageCount = (Math.floor( addresses.length / atc.rowsToDisplay)) + 1;
      if (addresses.length % 10 == 0){
        atc.pageCount -= 1;
      }
  }

}
