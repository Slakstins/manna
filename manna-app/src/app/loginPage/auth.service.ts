import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Driver } from '../interfaces/driver';
import { DriverAccountAPIService } from '../api-services/driver-account-api.service';

interface isModeratorRes{
  isModerator: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router, private accountAPI: DriverAccountAPIService) { }

  login(acct: Driver) {
    if (acct.account){
      localStorage.setItem("email", acct.account.email);
      localStorage.setItem("password", acct.account.password);
      this.goHome();
    }
    else {
      throw Error("driver profile lacks account");
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  async isModerator() {
    console.log("calling is moderator");
    return await this.accountAPI.isModerator(localStorage.getItem("email")).toPromise().then((res) => {
      return (res as isModeratorRes).isModerator;

    }, (error) => {
      return false;
    });
  }

  hasSignedIn() {
    return localStorage.getItem("email");
  }

  async goHome() {
    // if (!this.isSignedIn()){
      // throw new Error("cannot go home. account undefined");
    // }
    if (await this.isModerator().then((res) => {console.log(res); return res})){
      console.log("is moderator")
      this.router.navigate(['/addresses']);
    }
    else {
      console.log("is NOT moderator")
      this.router.navigate(['/driver-home']);
    }

  }

}
