import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressPageComponent } from './nav/address-page/address-page.component';
import { DriverPageComponent } from './nav/driver-page/driver-page.component';
import { RegisterComponent } from './loginPage/register.component';

const routes: Routes = [
    {path:'', redirectTo:"addresses", pathMatch:"full"},
    // {path: "addresses", component: AddressPageComponent},
    {path: "addresses", component: RegisterComponent},
    {path: "drivers", component: DriverPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
