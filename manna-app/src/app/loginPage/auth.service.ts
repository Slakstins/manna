import { Injectable } from '@angular/core';
import { DriverAccount } from '../interfaces/driver-account';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  login(acct: DriverAccount) {
    // this.driverAccount = acct;
    localStorage.setItem("email", acct.email);
    localStorage.setItem("isModerator", acct.moderator.toString());
    this.goHome();
  }

  isModerator() {
    return localStorage.getItem("isModerator") == "true";
  }

  isSignedIn() {
    return localStorage.getItem("email");
  }

  goHome() {
    if (!this.isSignedIn()){
      throw new Error("cannot go home. account undefined");
    }
    if (this.isModerator()){
      this.router.navigate(['/addresses']);
    }
    else {
      this.router.navigate(['/driver-home']);
    }

  }

}
