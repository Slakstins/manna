import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment';
import { SharedAPIService } from './sharedapi.service';
import { Driver } from '../interfaces/driver';
import { DriverAccount } from '../interfaces/driver-account';

@Injectable({
  providedIn: 'root'
})
export class DriverAccountAPIService {
  url = environment.baseUrl;
  collection = "driverAccount";
  constructor(private http: HttpClient, private sharedAPIService: SharedAPIService) {
  } 

  public get() {
    return this.sharedAPIService.get<DriverAccount>(this.collection);
  }


  public setField(data: any, id: string, field: string) {
    return this.sharedAPIService.setField(data, id, field, this.collection);
  }

  public login<DriverAccount>(data: DriverAccount) {
    return this.http.post(this.url + "driverAccount/login", data);
  }


  public post<DriverAccount>(data: DriverAccount) {
    return this.sharedAPIService.post<DriverAccount>(data, this.collection);
  }

  public delete(id: string) { 
    return this.sharedAPIService.delete(id, this.collection);
  } 
}
