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
  public setDelivery(data: Boolean, id: string){
    return this.http.patch(this.url + "address/" + id + "/setDelivery", {val: data});
  }
  public setNotes(data: string, id: string){
    return this.http.patch(this.url + "address/" + id + "/setNotes", {notes: data});
  }
  public post(data: Address) {
    return this.http.post(this.url + "address", data);
  }
  public delete(id: string) { 
    return this.http.delete(this.url + "address/" + id); 
  } 
  public put(data: Address) { 
    return this.http.put(this.url, data); 
  } 

}
