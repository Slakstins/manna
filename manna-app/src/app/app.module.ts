import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NavComponent } from './nav/nav.component';
import { AddressPageComponent } from './nav/address-page/address-page.component';
import { AddressTableComponent } from './nav/address-page/address-table/address-table.component';
import { RowPopupComponent } from './address-popup/row-popup.component';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from './nav/address-page/search.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule} from '@angular/material/dialog';
import { AddPopupComponent } from './add-popup/add-popup.component';
import { AddressValEditComponent } from './address-popup/address-val-edit/row-val-edit.component';
import { DriverPageComponent } from './nav/driver-page/driver-page.component';
import { DriverTableComponent } from './nav/driver-page/driver-table/driver-table.component';



@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    AddressPageComponent,
    AddressTableComponent,
    RowPopupComponent,
    SearchPipe,
    AddPopupComponent,
    AddressValEditComponent,
    DriverPageComponent,
    DriverTableComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
