import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DriverAccountAPIService } from '../api-services/driver-account-api.service';
import { AuthService } from './auth.service';
import { DriverAccount } from '../interfaces/driver-account';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  // styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  email: string = '';
  password: string = '';

  isLogin: boolean = true;
  erroMessage: string = "";

  constructor(private auth: AuthService, private driverAccountService: DriverAccountAPIService) { }
  ngOnInit(): void {
    if(this.auth.isSignedIn()) {
      this.auth.goHome();
    }
  }

  login() {
    console.log(this.email);
    console.log(this.password);

    let bodyData = {
      email: this.email,
      password: this.password,
    };

      this.driverAccountService.login(bodyData).subscribe(
        (res) => {
          //redirect to home page based on Moderator value. Auth level should be returned in res
          this.auth.login(res as DriverAccount);
          console.log("success");
        },
        (error) => {
          console.log(error);
        }

      );
  }
}
 