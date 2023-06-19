import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressPageComponent } from './nav/address-page/address-page.component';
import { DriverPageComponent } from './nav/driver-page/driver-page.component';
import { RegisterComponent } from './loginPage/register.component';
import { LoginComponent } from './loginPage/login.component';
import { DriverHomeComponent } from './driver-home/driver-home.component';
import { LoggedInGuardService } from './loginPage/loggedIn-guard.service';
import { ModeratorGuardService } from './loginPage/moderator-guard.service';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
    {path:'', redirectTo:"addresses", pathMatch:"full"},
    {path:'login', component: LoginComponent},
    {path:'register', component: RegisterComponent},
    {path: "driver-home", component: DriverHomeComponent, canActivate: [LoggedInGuardService]},
    {path: "addresses", component: AddressPageComponent, canActivate: [ModeratorGuardService]},
    {path: "drivers", component: DriverPageComponent, canActivate: [ModeratorGuardService]},
    {path: "settings", component: SettingsComponent, canActivate: [LoggedInGuardService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
