import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { DriverAPIService } from 'src/app/api-services/driverapi.service';
import { Driver } from 'src/app/interfaces/driver';

@Component({
  selector: 'app-driver-table',
  templateUrl: './driver-table.component.html',
  styleUrls: ['../../shared-styles/table.component.css']
})
export class DriverTableComponent {
  constructor(private driverAPI: DriverAPIService){}

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
    // let dialogRef = this.dialog.open(AddDriverComponent);
    // //subscribe to events!!
    // const sub = dialogRef.componentInstance.onAdd.subscribe((driver) => {
    //   this.addDriverTableData(driver);
    //   // do something
    // });
    // dialogRef.afterClosed().subscribe(() => {
    //   sub.unsubscribe();
    // });
  }

  addDriverTableData(driver: Driver) {
    this.drivers.push(driver);
  }

  removeDriverTableData(id: string){
    this.drivers = this.drivers.filter((driver) => {
      return driver._id != id;
    })
  }

  displayRowData(driver: Driver) {
    // console.log(driver);
    // let dialogRef = this.dialog.open(DriverPopupComponent, {
    //   data: driver,
    // });
    // const sub = dialogRef.componentInstance.onDel.subscribe((id) => {
    //   this.removeDriverTableData(id);
    //   // do something
    // });
    // dialogRef.afterClosed().subscribe(() => {
    //   sub.unsubscribe();
    // });
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


}
