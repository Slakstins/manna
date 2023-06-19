import { Component } from '@angular/core';
import { AuthService } from '../loginPage/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  constructor(private auth: AuthService){}
  logout() {
    this.auth.logout();
  }

}
