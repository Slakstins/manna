import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Address } from 'src/app/address';
import { AddressAPIService } from 'src/app/addressapi.service';
import { HttpSetFuncs } from 'src/app/http-set-funcs';

@Component({
  selector: 'app-address-val-edit',
  templateUrl: './address-val-edit.component.html',
  styleUrls: ['./address-val-edit.component.css']
})
export class AddressValEditComponent implements OnInit, OnDestroy{
  constructor(private addressAPI: AddressAPIService){}
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  ngOnInit(): void {
    this.tempValue = this.value;
    if (this.value == ""){
      this.value = "no notes";
    }
  }
  @Input()
  label!: string;
  @Input()
  value!: string;
  @Input()
  id!: string;

  sub!: Subscription;
  tempValue!: string;

  editing = false;

  @Output()
  edit = new EventEmitter();

  activeEdits = {
    name: false,
    address: false,
    phone: false
  }


  update() {
    const httpFunc = this.addressAPI.setFuncs[this.label as keyof HttpSetFuncs];
    this.sub = httpFunc(this.tempValue, this.id).subscribe((_res: any) => {
      this.value = this.tempValue;
      this.editing = false;
      this.edit.emit(this.value);
    },
    (error: any) => {
      console.log(error);
    });
  }
}
