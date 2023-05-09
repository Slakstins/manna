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

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    AddressPageComponent,
    AddressTableComponent,
    AddressPopupComponent,
    SearchPipe,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
