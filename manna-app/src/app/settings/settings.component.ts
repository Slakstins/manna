import { Component, OnInit } from '@angular/core';
import { AuthService } from '../loginPage/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit{
  constructor(private auth: AuthService, private authService: AuthService){}
  isModerator = false;
  ngOnInit(): void {
    this.auth.isModerator().then((res) => {
      this.isModerator = res;

    })
  }
  logout() {
    this.auth.logout();
  }

}
