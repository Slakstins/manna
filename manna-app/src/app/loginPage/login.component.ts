import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DriverAccountAPIService } from '../api-services/driver-account-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  // styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  email: string = '';
  password: string = '';

  isLogin: boolean = true;
  erroMessage: string = "";

  constructor(private router: Router, private http: HttpClient, private driverAccountService: DriverAccountAPIService) { }

  login() {
    console.log(this.email);
    console.log(this.password);

    let bodyData = {
      email: this.email,
      password: this.password,
    };

      this.driverAccountService.login(bodyData).subscribe(
        (res) => {
          console.log("success");
        },
        (error) => {
          console.log(error);
        }

      );
  }
}
 