import { Pipe, PipeTransform } from '@angular/core';
import { Address } from 'src/app/address';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(addresses: Address[], searchText: string, searchField: string, page: number): Address[] {
    if (addresses == null){
      return addresses;
    }
    else if (searchText.trim() == "") {
      return addresses.slice((page - 1) * 10, (page) * 10);
    }
    else {
      return addresses.filter((address) => {
        return address[searchField as keyof Address].includes(searchText.trim())
      })
    }
  }

}
