import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Address } from '../interfaces/address';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class SharedAPIService {
  url = environment.baseUrl;
  constructor(private http: HttpClient) {
  } 

  public get(collection: string) {
    return this.http.get<Address[]>(this.url + "address/all");
  }


  public setField(data: any, id: string, field: string, collection: string) {
    return this.http.patch(this.url + "address/" + id + "/set/" + field, {[field]: data});
  }


  public post<Type>(data: Type, collection: string) {
    return this.http.post(this.url + "address", data);
  }

  public delete(id: string, collection: string) { 
    return this.http.delete(this.url + "address/" + id); 
  } 

}
