import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-new-data',
  templateUrl: './new-data.component.html',
  styleUrls: ['./new-data.component.scss'],
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
    departureDate: new FormControl('', [Validators.required]),
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
    subscribeDate: new FormControl('', [Validators.required]),
    // 租赁天数
    days: new FormControl('', [Validators.required])
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



}
