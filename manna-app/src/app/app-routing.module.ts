import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressPageComponent } from './nav/address-page/address-page.component';

const routes: Routes = [
    {path:'', redirectTo:"addresses", pathMatch:"full"},
    {path: "addresses", component: AddressPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
