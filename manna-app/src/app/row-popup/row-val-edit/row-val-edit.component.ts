import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Address } from 'src/app/interfaces/address';
import { AddressAPIService } from 'src/app/api-services/addressapi.service';
import { HttpSetFuncs } from 'src/app/http-set-funcs';

@Component({
  selector: 'app-row-val-edit',
  templateUrl: './row-val-edit.component.html',
  styleUrls: ['./row-val-edit.component.css']
})
export class AddressValEditComponent implements OnInit, OnDestroy{
  constructor(){}
  @Input() API: any;
  @Input() type!: string;
  ngOnDestroy(): void {
    if (this.sub){
      this.sub.unsubscribe();
    }
  }
  ngOnInit(): void {
    this.tempValue = this.value;
    //empty strings are falsey. Thank you js
    if (typeof(this.value) == "string" && this.value == ""){
      this.value = "no notes";
    }
  }
  @Input()
  label!: string;
  @Input()
  value!: string | boolean;
  @Input()
  id!: string;

  sub!: Subscription;
  tempValue!: string | boolean;

  editing = false;

  @Output()
  edit = new EventEmitter();


  toggleValue() {
    this.sub = this.API.setField(!this.value, this.id, this.label).subscribe((_res: any) => {
      this.value = !this.value;
      this.edit.emit(this.value);

    },
      (error: any) => {
        console.log(error);
      });
  }



  update() {
    this.sub = this.API.setField(this.tempValue, this.id, this.label).subscribe((_res: any) => {
      this.value = this.tempValue;
      this.editing = false;
      this.edit.emit(this.value);
    },
    (error: any) => {
      console.log(error);
    });
  }
}
