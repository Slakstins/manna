import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment';
import { SharedAPIService } from './sharedapi.service';
import { Driver } from '../interfaces/driver';

@Injectable({
  providedIn: 'root'
})
export class DriverAPIService {
  url = environment.baseUrl;
  collection = "driver";
  constructor(private http: HttpClient, private sharedAPIService: SharedAPIService) {
  } 

  public get() {
    return this.http.get<Driver[]>(this.url + "drivers", {});
  }


  getDriver(email: string) {
    return this.http.get(this.url + "driver/" + email, {});

  }

  public setField(data: any, id: string, field: string) {
    return this.sharedAPIService.setField(data, id, field, this.collection);
  }

  public setDrivingValsFalse() {
    return this.http.patch(this.url + "driver/setDrivingValsFalse", {});
  }

  public postAccount<DriverAccount>(data: DriverAccount) {
    return this.http.post(this.url + "driver/account", data);
  }

  public post<Driver>(data: Driver) {
    return this.sharedAPIService.post<Driver>(data, this.collection);
  }

  public delete(id: string) { 
    return this.sharedAPIService.delete(id, this.collection);
  } 


}
