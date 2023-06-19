import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NavComponent } from './nav/nav.component';
import { AddressPageComponent } from './nav/address-page/address-page.component';
import { AddressTableComponent } from './nav/address-page/address-table/address-table.component';
import { AddressPopupComponent } from './nav/address-page/address-table/address-popup/address-popup.component';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from './nav/address-page/search.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule} from '@angular/material/dialog';
import { AddAddressComponent } from './nav/address-page/address-table/add-address/add-address.component';
import { AddressValEditComponent } from './nav/address-page/address-table/address-popup/address-val-edit/address-val-edit.component';
import { DriverPageComponent } from './nav/driver-page/driver-page.component';
import { DriverTableComponent } from './nav/driver-page/driver-table/driver-table.component';
import { LoginComponent } from './loginPage/login.component';
import { RegisterComponent } from './loginPage/register.component';
import { DriverHomeComponent } from './driver-home/driver-home.component';
import { SettingsComponent } from './settings/settings.component';
import { DriverNavComponent } from './driver-nav/driver-nav.component';



@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    AddressPageComponent,
    AddressTableComponent,
    AddressPopupComponent,
    SearchPipe,
    AddAddressComponent,
    AddressValEditComponent,
    DriverPageComponent,
    DriverTableComponent,
    LoginComponent,
    RegisterComponent,
    DriverHomeComponent,
    SettingsComponent,
    DriverNavComponent
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
