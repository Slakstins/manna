import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { DriverAccountAPIService } from '../api-services/driver-account-api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  // styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  firstname: string = "";
  lastname: string = "";
  email: string = "";
  password: string = "";
  phone: string = "";

  constructor(private http: HttpClient, private driverAccountService: DriverAccountAPIService) {
  }

  ngOnInit(): void {
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
        console.log("success");
      },
      (error) => {
        console.log(error);
      }

    )

  }

}