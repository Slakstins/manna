import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DriverAPIService } from 'src/app/api-services/driverapi.service';
import { Driver } from 'src/app/interfaces/driver';

@Component({
  selector: 'app-driver-home',
  templateUrl: './driver-home.component.html',
  styleUrls: ['./driver-home.component.css']
})
export class DriverHomeComponent implements OnDestroy, OnInit {
  email = localStorage.getItem("email");
  driver!: Driver;




  constructor(private driverAPI: DriverAPIService) { }
  ngOnInit(): void {
    this.getCurrentDriver();
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  private sub: Subscription | undefined;




  setDriving(val: Boolean) {
    this.sub = this.driverAPI.setField(val, this.driver._id, "driving").subscribe((res) => {
      console.log("set driving to " + val);
    },
      (error) => {
        console.log(error);
      });
  }

  getCurrentDriver() {
    this.sub = this.driverAPI.getDriver(this.email as string).subscribe((res) => {
      this.driver = res as Driver;
      console.log("driver data obtained");
    },
      (error) => {
        console.log(error);
      });

  }

}

