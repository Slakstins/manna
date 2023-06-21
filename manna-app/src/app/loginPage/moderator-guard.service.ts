import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ModeratorGuardService {

  constructor(private auth: AuthService, private router: Router) { }
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    if (this.auth.hasSignedIn() && await this.auth.isModerator()) {
      return true;
    } else {
      this.router.navigate(['/driver-home']);
      return false;
    }
  }
}
