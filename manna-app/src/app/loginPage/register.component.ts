import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DriverAccountAPIService } from '../api-services/driver-account-api.service';
import { AuthService } from './auth.service';
import { Driver } from '../interfaces/driver';
import { Validators } from '@angular/forms';

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

  checkValidData(invalids: any[]) {
    
    return this.firstname.trim() && this.lastname.trim() && this.email.trim() && this.password.trim() && this.phone.trim() &&
    this.password.length >= 6 && this.phone.length == 10 && !invalids.includes(true);
  }

  register() {
    let accountData = {
      email: this.email,
      password: this.password
    }
    let bodyData =
    {
      "fname": this.firstname,
      "lname": this.lastname,
      "phone": this.phone,
      "account": accountData
    };
    console.log(bodyData);
    this.driverAccountService.post(bodyData).subscribe(
      (res) => {
        //redirect to driver homepage
        const driver = res as Driver;
        if (driver.account){
          driver.account.password = bodyData.account.password;
          this.auth.login(driver);
        }
      },
      (error) => {
        if (error.status == 409){
          this.emailAlreadyInUse();
        }
        console.log(error);
      }

    )

  }

  emailAlreadyInUse(){
    alert("That email is already in use. Please choose a different one.")

  }

}