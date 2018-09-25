import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from "../app/welcome/welcome.component";
import { HomeComponent } from "../app/home/home.component";
import { OverviewComponent } from "../app/home/overview/overview.component";
import { CustomerComponent } from "../app/home/customer/customer.component";
import { VehicleComponent } from "../app/home/vehicle/vehicle.component";
import { AirlineComponent } from "../app/home/airline/airline.component";
import { ShipComponent } from "../app/home/ship/ship.component";
import { HotelComponent } from "../app/home/hotel/hotel.component";
import { MetaDataComponent } from "../app/home/meta-data/meta-data.component";
import { NewDataComponent } from "../app/home/new-data/new-data.component";
import { ProfileComponent } from "../app/home/profile/profile.component";
import { SettingsComponent } from "../app/home/settings/settings.component";

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'overview',
        component: OverviewComponent,
      },
      {
        path: 'customer',
        component: CustomerComponent
      },
      {
        path: 'vehicle',
        component: VehicleComponent
      },
      {
        path: 'airline',
        component: AirlineComponent
      },
      {
        path: 'ship',
        component: ShipComponent
      },
      {
        path: 'hotel',
        component: HotelComponent
      },
      {
        path: 'meta-data',
        component: MetaDataComponent
      },
      {
        path: 'new-data',
        component: NewDataComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'settings',
        component: SettingsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
