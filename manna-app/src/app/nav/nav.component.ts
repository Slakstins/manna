import { Component, OnDestroy } from '@angular/core';
import { AddressAPIService } from '../addressapi.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnDestroy {
  constructor(private addressAPI: AddressAPIService) { }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  sub!: Subscription;

  setDeliveriesFalse() {

    if (confirm("Clear Delivery Data? This will mark all deliveries as X")) {
      this.sub = this.addressAPI.setDeliveriesFalse().subscribe((res) => {
          window.location.reload();
      },
        (error) => {
          console.log(error);
        })
    }
  }



}
