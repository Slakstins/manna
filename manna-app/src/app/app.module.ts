import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NavComponent } from './nav/nav.component';
import { AddressPageComponent } from './nav/address-page/address-page.component';
import { AddressTableComponent } from './nav/address-page/address-table/address-table.component';
import { RowPopupComponent } from './row-popup/row-popup.component';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from './nav/address-page/search.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule} from '@angular/material/dialog';
import { AddPopupComponent } from './add-popup/add-popup.component';
import { AddressValEditComponent } from './row-popup/row-val-edit/row-val-edit.component';
import { DriverPageComponent } from './nav/driver-page/driver-page.component';
import { DriverTableComponent } from './nav/driver-page/driver-table/driver-table.component';
import { LoginComponent } from './loginPage/login.component';
import { RegisterComponent } from './loginPage/register.component';
import { DriverHomeComponent } from './driver-nav/driver-home/driver-home.component';
import { SettingsComponent } from './settings/settings.component';
import { DriverNavComponent } from './driver-nav/driver-nav.component';
import { NgxMaskApplierService } from 'ngx-mask/lib/ngx-mask-applier.service';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';



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
    MatDialogModule,
    NgxMaskDirective,
    NgxMaskPipe
  ],
  providers: [provideNgxMask()],
  bootstrap: [AppComponent]
})
export class AppModule { }
