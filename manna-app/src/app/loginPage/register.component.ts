import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DriverAccountAPIService } from '../api-services/driver-account-api.service';
import { AuthService } from './auth.service';
import { DriverAccount } from '../interfaces/driver-account';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  // styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{

  firstname: string = "";
  lastname: string = "";
  email: string = "";
  password: string = "";
  phone: string = "";

  constructor(private auth: AuthService, private driverAccountService: DriverAccountAPIService) {
  }

  ngOnInit(): void {
    // if (this.auth.isSignedIn()){
      // this.auth.goHome();
    // }
  }

  register() {
    let bodyData =
    {
      "firstname": this.firstname,
      "lastname": this.lastname,
      "email": this.email,
      "password": this.password,
    };
    this.driverAccountService.post(bodyData).subscribe(
      (res) => {
        //redirect to driver homepage
        (res as DriverAccount).password = bodyData.password;
        this.auth.login(res as DriverAccount);
      },
      (error) => {
        console.log(error);
      }

    )

  }

}