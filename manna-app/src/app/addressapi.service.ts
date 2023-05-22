import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Address } from './address';
import { HttpSetFuncs } from './http-set-funcs';

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



  setFuncs: HttpSetFuncs = {
    name: (data: string, id: string) =>
    {return this.http.patch(this.url + "address/" + id + "/set/name", {name: data})},
    phone: (data: string, id: string) =>
    {return this.http.patch(this.url + "address/" + id + "/set/phone", {phone: data})},
    address: (data: string, id: string) =>
    {return this.http.patch(this.url + "address/" + id + "/set/address", {address: data})},
    notes: (data: string, id: string) =>
    {return this.http.patch(this.url + "address/" + id + "/set/notes", {notes: data})},
    delivery: (data: string, id: string) =>
    {return this.http.patch(this.url + "address/" + id + "/set/delivery", {delivery: data})},
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
