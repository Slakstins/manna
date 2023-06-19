import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { DriverAccountAPIService } from '../api-services/driver-account-api.service';
import { DriverAccount } from '../interfaces/driver-account';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuardService {

  constructor(private accountAPI: DriverAccountAPIService, private auth: AuthService, private router: Router) { }
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    if (this.auth.hasSignedIn()) {
      let email = localStorage.getItem("email");
      let password = localStorage.getItem("password");
      let driverAccount = {
        email: email,
        password: password,
        moderator: false
      }
      let success = await this.accountAPI.login(driverAccount as DriverAccount).toPromise().then((res) => {
        return true
      }, (error) => {
        return false;
      });


      return success;
    } else {
      alert('Please log in')
      this.router.navigate(['/login']);
      return false;
    }
  }
}
