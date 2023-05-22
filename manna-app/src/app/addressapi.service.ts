import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Address } from './address';

@Injectable({
  providedIn: 'root'
})
export class AddressAPIService {
  url = "http://localhost:3000/";

  constructor(private http: HttpClient) {
  } 

  public get() {
    return this.http.get<Address[]>(this.url + "addresses");
  }


  public setField(data: any, id: string, field: string) {
    return this.http.patch(this.url + "address/" + id + "/set/" + field, {[field]: data})
  }



  public post<Address>(data: Address) {
    return this.http.post(this.url + "address", data);
  }

  public delete(id: string) { 
    return this.http.delete(this.url + "address/" + id); 
  } 

  public put(data: Address) { 
    return this.http.put(this.url, data); 
  } 
}
