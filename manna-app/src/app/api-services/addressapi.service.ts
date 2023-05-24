import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment';
import { SharedAPIService } from './sharedapi.service';

@Injectable({
  providedIn: 'root'
})
export class AddressAPIService {
  url = environment.baseUrl;
  collection = "address";
  constructor(private http: HttpClient, private sharedAPIService: SharedAPIService) {
  } 

  public get() {
    return this.sharedAPIService.get(this.collection);
  }


  public setField(data: any, id: string, field: string) {
    // return this.http.patch(this.url + "address/" + id + "/set/" + field, {[field]: data});
    return this.sharedAPIService.setField(data, id, field, this.collection);
  }

  public setDeliveriesFalse() {
    return this.http.patch(this.url + "address/setDeliveriesFalse", {});
  }



  //why is no import needed for Address here?
  public post<Address>(data: Address) {
    // return this.http.post(this.url + "address", data);
    return this.sharedAPIService.post<Address>(data, this.collection);
  }

  public delete(id: string) { 
    return this.sharedAPIService.delete(id, this.collection);
  } 


}
