import {ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AddPopupFormat, InputType } from 'src/app/add-popup/add-popup-format';
import { AddPopupComponent } from 'src/app/add-popup/add-popup.component';
import { DriverAPIService } from 'src/app/api-services/driverapi.service';
import { Driver } from 'src/app/interfaces/driver';
import { RowPopupComponent } from 'src/app/row-popup/row-popup.component';

@Component({
  selector: 'app-driver-table',
  templateUrl: './driver-table.component.html',
  styleUrls: ['../../shared-styles/table.component.css']
})
export class DriverTableComponent {
  constructor(private driverAPI: DriverAPIService, public dialog: MatDialog){}

  options = [{ description: "any", id: 0 }, { description: "name", id: 1 }, { description: "phone", id: 2 },{ description: "notes", id: 3 }
  ];
  searchText = "";
  rowsToDisplay = 10;
  page: number = 1;
  public pageCount!: number;
  sub!: Subscription;
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  searchField = "any";
  ngOnInit(): void {
    this.sub = this.driverAPI.get().subscribe((res) => {
      this.drivers = res;
      this.pageCount = (Math.floor(this.drivers.length / this.rowsToDisplay)) + 1;
      if (this.drivers.length % 10 == 0) {
        this.pageCount -= 1;
      }
      console.log(this.drivers);
    },
      (error) => {
        console.log(error);
      })

  }


  drivers!: Driver[];

  displayAddDriver() {
    let dialogRef = this.dialog.open(AddPopupComponent, {
      data: {
        addPopupData: this.addPopupData,
        addFunction: this.addDriver
      }
    });
  }
  addDriver = (d: AddPopupFormat[], dialogRef: MatDialogRef<AddPopupComponent>) => {
    //convert to address format
    let driver : Driver = {driving: false, name: "", notes: "", phone: ""};
    for(let field of d) {
      this.update(field.label as keyof(Driver), driver, field.value );
    }
    //call api
    this.sub = this.driverAPI.post(driver).subscribe((res) => {
      console.log("successfully added");
      console.log(this.drivers);
      //push does not result in change detection here, use spread instead
      this.drivers = [...this.drivers, res as Driver];
      dialogRef.close();
    },
    (error) => {
      console.log(error);
    });
  } 

  //fixes weird type issue
   update<Key extends keyof Driver>(key: Key, a: Driver[Key], value: any) {
      a[key] = value;
  }

  addDriverTableData(driver: Driver) {
    this.drivers.push(driver);
  }


  displayRowData(driver: Driver) {
    let dialogRef = this.dialog.open(RowPopupComponent, {
      data: {
        "model": driver,
        "API": this.driverAPI,
        "confs": this.valEditComponentConfs
      },
    });
    const sub = dialogRef.componentInstance.onDel.subscribe((id) => {
      this.removeDriverTableData(id);
      // do something
    });
    dialogRef.afterClosed().subscribe(() => {
      sub.unsubscribe();
    });
  }

  removeDriverTableData(id: string){
    this.drivers = this.drivers.filter((driver) => {
      return driver._id != id;
    })
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
    }
  }

  nextPage() {
    if (this.page < this.pageCount) {
      this.page++;
    }
  }
  goToFirstPage() {
    this.page = 1;
  }
  setSearchField(field: string) {
    console.log("search field set to: " + field);
    this.searchField = field;
  }

  addPopupData: AddPopupFormat[] = [
    {
    label: "name",
    type: InputType.Text,
    value: ""
    },
    {
    label: "phone",
    type: InputType.Text,
    value: ""
    },
    {
    label: "notes",
    type: InputType.Text,
    value: ""
    },
    {
    label: "driving",
    type: InputType.Check,
    value: false
    },
]

  valEditComponentConfs: any[] = [
    {label: "name",
    type: "string"},
    {label: "phone",
    type: "string"},
    {label: "notes",
    type: "string"},
    {label: "driving",
    type: "check"},
  ]
}
