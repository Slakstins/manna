import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DriverAccountAPIService } from '../api-services/driver-account-api.service';
import { AuthService } from './auth.service';
import { Driver } from '../interfaces/driver';

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
      "fname": this.firstname,
      "lname": this.lastname,
      "email": this.email,
      "password": this.password,
      "phone": this.phone
    };
    this.driverAccountService.post(bodyData).subscribe(
      (res) => {
        //redirect to driver homepage
        const driver = res as Driver;
        if (driver.account){
          driver.account.password = bodyData.password;
          this.auth.login(driver);
        }
      },
      (error) => {
        console.log(error);
      }

    )

  }

}