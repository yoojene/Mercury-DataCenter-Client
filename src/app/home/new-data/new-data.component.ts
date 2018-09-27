import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import * as _moment from 'moment';
const moment = _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MM YYYY',
  },
};

@Component({
  selector: 'app-new-data',
  templateUrl: './new-data.component.html',
  styleUrls: ['./new-data.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class NewDataComponent implements OnInit {
  // CUSTOMER
  nationalityList = ['China', 'USA', 'Japan', 'Taiwan', 'HangKong', 'Canda', 'Britihsh']
  customer = {
    id: '',
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required]),
    nationality: new FormControl('', [Validators.required])
  }

  // AIRLINE
  cabinList = ['经济舱', '头等舱', '商务舱']
  airline = {
    id: '',
    name: new FormControl('', [Validators.required]),
    roundTrip: new FormControl('', [Validators.required]),
    // departureDate: new FormControl('', [Validators.required]),
    departureDate: new FormControl(moment('')),
    cabin: new FormControl('', [Validators.required])
  }

  // VEHICLE
  providerIndex = 0
  vehicleProviderList = [
    {
      name: 'Mercury',
      type: ['SUV', 'Sprinter']
    },
    {
      name: 'Other',
      type: ['越野车', '商务车']
    }
  ]

  vehicle = {
    provider: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    numOfSeats: new FormControl('', [Validators.required]),
    // 预定日期
    // subscribeDate: new FormControl('', [Validators.required]),
    subscribeDate: new FormControl(moment('')),
    // 租赁天数
    days: new FormControl('', [Validators.required])
  }

  // HOTEL
  hotelList = [
    {
      name: "Radisson Hotel Seattle Airport",
      address: "1818 International Blvd, Seattle"
    },
    {
      name: "Red Lion Hotel Seattle Airport",
      address: "18220 International Boulevard, Seattle"
    }
  ]
  hotel = {
    name: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    // checkInDate:new FormControl('',[Validators.required]),
    checkInDate: new FormControl(moment('')),
    days: new FormControl('', [Validators.required]),
    numOfRooms: new FormControl('', [Validators.required])
  }

  // SHIP
  shipProviderList = [
    {
      name: 'Ship 1',
      type: ['t1', 't2', 't3']
    },
    {
      name: 'Ship 2',
      type: ['p1', 'p2']
    }
  ]
  ship = {
    provider: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    journeyType: new FormControl('', [Validators.required]),
    journeyDesc: new FormControl('', [Validators.required]),
    departurePort: new FormControl('', [Validators.required]),
    // departureDate:new FormControl('',[Validators.required])
    departureDate: new FormControl(moment(''))
  }

  constructor() { }

  ngOnInit() {
  }

  // ==== CUSTOMER ====
  // customerEmail = new FormControl('', [Validators.required, Validators.email]);
  getEmailErrorMessage() {
    return this.customer.email.hasError('required') ? 'You must enter a correct email address' :
      this.customer.email.hasError('email') ? 'Not a valid email' :
        '';
  }

  saveCustomer() {
    console.log(this.customer)
  }

  saveAirline() {
    console.log(this.airline)
  }

  saveVehicle() {
    console.log(this.vehicle)
  }

  saveHotel() {
    console.log(this.hotel)
  }

  saveShip() {
    console.log(this.ship)
  }



}
