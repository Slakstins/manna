import { Pipe, PipeTransform, Type } from '@angular/core';
import { Address } from 'src/app/interfaces/address';
import { AddressTableComponent } from './address-table/address-table.component';

interface Paginated {
  rowsToDisplay: number;
  pageCount: number;
}

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform<Type, ComponentType extends Paginated> (addresses: Type[], searchText: string, searchField: string, page: number, atc: ComponentType): Type[] {
    if (addresses == null) {
      this.updatePageCount(addresses, atc);
      return addresses;
    }
    else if (searchText.trim() == "") {
      this.updatePageCount<Type, ComponentType>(addresses, atc);
      return addresses.slice((page - 1) * 10, (page) * 10);
    }
    else {
      var filtered = addresses.filter((address) => {
        if (searchField == "any"){
          return Object.entries(address as Object).some(entry =>
            String(entry[1]).toLowerCase().includes(searchText.trim().toLowerCase()));

        }
        else {
          return (address[searchField as keyof Type] as string).toLowerCase().includes(searchText.trim().toLowerCase())
        }
      })
      this.updatePageCount<Type, ComponentType>(filtered, atc);
      return filtered.slice((page - 1) * 10, (page) * 10);

    }
  }

  updatePageCount<Type, ComponentType extends Paginated>(addresses: Type[], atc: ComponentType) {
    if (addresses == undefined){
      return;
    }
      atc.pageCount = (Math.floor( addresses.length / atc.rowsToDisplay)) + 1;
      if (addresses.length % 10 == 0){
        atc.pageCount -= 1;
      }
  }

}
