import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class SharedAPIService {
  url = environment.baseUrl;
  constructor(private http: HttpClient) {
  } 

  public get<Type>(collection: string) {
    return this.http.get<Type[]>(this.url + collection + "/all");
  }


  public setField(data: any, id: string, field: string, collection: string) {
    return this.http.patch(this.url + collection + "/" + id + "/set/" + field, {[field]: data});
  }


  public post<Type>(data: Type, collection: string) {
    return this.http.post(this.url + collection, data);
  }

  public delete(id: string, collection: string) { 
    return this.http.delete(this.url + collection + "/" + id); 
  } 

}
