import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartModule } from "angular-highcharts";
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HomeComponent } from './home/home.component';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LeftMenuComponent } from './home/left-menu/left-menu.component';
import { OverviewComponent } from './home/overview/overview.component';
import { CustomerComponent } from './home/customer/customer.component';
import { VehicleComponent } from './home/vehicle/vehicle.component';
import { AirlineComponent } from './home/airline/airline.component';
import { ShipComponent } from './home/ship/ship.component';
import { HotelComponent } from './home/hotel/hotel.component';
import { MetaDataComponent } from './home/meta-data/meta-data.component';
import { NewDataComponent } from './home/new-data/new-data.component';
import { ProfileComponent } from './home/profile/profile.component';
import { SettingsComponent } from './home/settings/settings.component';


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HomeComponent,
    LeftMenuComponent,
    OverviewComponent,
    CustomerComponent,
    VehicleComponent,
    AirlineComponent,
    ShipComponent,
    HotelComponent,
    MetaDataComponent,
    NewDataComponent,
    ProfileComponent,
    SettingsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ChartModule,
    MatButtonModule,
    MatCheckboxModule,
    MatGridListModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatListModule,
    MatMenuModule,
    MatCardModule,
    MatTableModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
