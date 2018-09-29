import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { UtilityService } from '../../service/utility.service';
import { HttpService } from '../../service/http.service';
import { Http, URLSearchParams } from '@angular/http';
import { PostResponse } from "../../module/PostResponse";

import * as _moment from 'moment';

const moment = _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'YYYY-MM-DD', // datepicker display format
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
    UtilityService,
    HttpService
  ],
})

export class NewDataComponent implements OnInit {
  // CUSTOMER
  nationalityList = ['China', 'USA', 'Japan', 'Taiwan', 'HangKong', 'Canda', 'Britihsh'];
  customer = {
    id: '',
    name: new FormControl('', [Validators.required]),
    birthday: new FormControl(moment('')),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required]),
    nationality: new FormControl('', [Validators.required])
  };
  // Deep copy ??????
  originCustomer = Object.assign({}, this.customer)

  // ===================

  // AIRLINE
  cabinList = ['经济舱', '头等舱', '商务舱'];
  airline = {
    id: '',
    name: new FormControl('', [Validators.required]),
    roundTrip: new FormControl('', [Validators.required]),
    departureDate: new FormControl(moment('')),
    cabin: new FormControl('', [Validators.required])
  };

  // VEHICLE
  vehicleProviderIndex = 0;
  vehicleProviderList = [
    {
      name: 'Mercury',
      type: ['SUV', 'Sprinter']
    },
    {
      name: 'Other',
      type: ['越野车', '商务车']
    }
  ];

  vehicle = {
    id: '',
    provider: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    numOfSeats: new FormControl('', [Validators.required, Validators.pattern(/^([1-9]|[1-9][0-9]|[1-9][0-9][0-9])$/)]),
    // 预定日期
    subscribeDate: new FormControl(moment('')),
    // 租赁天数
    days: new FormControl('', [Validators.required, Validators.pattern(/^([1-9]|[1-9][0-9]|[1-9][0-9][0-9])$/)])
  };

  // HOTEL
  hotelIndex = -1;
  hotelList = [
    {
      name: 'Radisson Hotel Seattle Airport',
      address: '1818 International Blvd, Seattle'
    },
    {
      name: 'Red Lion Hotel Seattle Airport',
      address: '18220 International Boulevard, Seattle'
    }
  ];
  hotel = {
    id: '',
    name: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    checkInDate: new FormControl(moment('')),
    days: new FormControl('', [Validators.required, Validators.pattern(/^([1-9]|[1-9][0-9]|[1-9][0-9][0-9])$/)]),
    numOfRooms: new FormControl('', [Validators.required, Validators.pattern(/^([1-9]|[1-9][0-9]|[1-9][0-9][0-9])$/)])
  };

  // SHIP
  shipProviderIndex = 0;
  shipProviderList = [
    {
      name: 'Ship 1',
      type: ['t1', 't2', 't3']
    },
    {
      name: 'Ship 2',
      type: ['p1', 'p2']
    }
  ];
  ship = {
    id: '',
    provider: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    journeyType: new FormControl('', [Validators.required]),
    journeyDesc: new FormControl('', [Validators.required]),
    departurePort: new FormControl('', [Validators.required]),
    departureDate: new FormControl(moment(''))
  };

  isProcessing = 'null'  // 'null' / 'yes' / 'no'
  processResult = '' // 'success' / 'fail' / ''

  constructor(private utilityService: UtilityService,
    private httpService: HttpService) {
  }

  ngOnInit() { }

  hideProcessResult() {
    let self = this
    setTimeout(() => {
      self.isProcessing = 'null'
      self.processResult = ''
    }, 3000);
  }

  // ==== CUSTOMER ====
  getEmailErrorMessage() {
    return this.customer.email.hasError('required') ? 'You must enter a correct email address' :
      this.customer.email.hasError('email') ? 'Not a valid email' :
        '';
  }

  onHotelNameChange(event) {
    let self = this;
    self.hotel.address = new FormControl('', [Validators.required]);
    this.hotelList.forEach(function (item, index) {
      if (item.name == event.value) {
        self.hotelIndex = index;
        self.hotel.address = new FormControl(self.hotelList[index].address, Validators.required);
      }
    });
  }

  onVehicleProviderChange(event) {
    let self = this;
    self.vehicle.type = new FormControl('', [Validators.required]);
    this.vehicleProviderList.forEach(function (item, index) {
      if (item.name == event.value) {
        self.vehicleProviderIndex = index;
      }
    });
  }

  onShipProviderChange(event) {
    let self = this;
    self.ship.type = new FormControl('', [Validators.required]);
    this.shipProviderList.forEach(function (item, index) {
      if (item.name == event.value) {
        self.shipProviderIndex = index;
      }
    });
  }

  //==== Handle Save Button Click ====
  saveCustomer() {
    let self = this;
    this.isProcessing = 'yes'
    let customer = {
      id: this.utilityService.generateID('customers'),
      name: this.customer.name.value,
      birthday: this.utilityService.formatDate(this.customer.birthday.value._i),
      email: this.customer.email.value,
      phone: this.customer.phone.value,
      nationality: this.customer.nationality.value
    };

    let params = new URLSearchParams();
    for (const key in this.customer) {
      if (this.customer.hasOwnProperty(key)) {
        params.append(key, customer[key]);
      }
    }
    let data = params.toString();

    this.httpService.saveNewDataAPI('customers', data).subscribe(
      (response: PostResponse) => {
        if (response.code == 200) {
          self.isProcessing = 'no'
          self.processResult = 'success'
          self.hideProcessResult()
        } else {
          self.isProcessing = 'no';
          self.processResult = 'fail'
          self.hideProcessResult()
        }
      },
      error => {
        self.isProcessing = 'no';
        self.processResult = 'fail'
        self.hideProcessResult()
      }
    );
  }

  saveAirline() {
    let self = this;
    this.isProcessing = 'yes'
    let airline = {
      id: this.utilityService.generateID('airlines'),
      name: this.airline.name.value,
      roundTrip: this.airline.roundTrip.value,
      departureDate: this.utilityService.formatDate(this.airline.departureDate.value._i),
      cabin: this.airline.cabin.value
    };

    let params = new URLSearchParams();
    for (const key in this.airline) {
      if (this.airline.hasOwnProperty(key)) {
        params.append(key, airline[key]);
      }
    }
    let data = params.toString();

    this.httpService.saveNewDataAPI('airlines', data).subscribe(
      (response: PostResponse) => {
        if (response.code == 200) {
          self.isProcessing = 'no'
          self.processResult = 'success'
          self.hideProcessResult()
        } else {
          self.isProcessing = 'no';
          self.processResult = 'fail'
          self.hideProcessResult()
        }
      },
      error => {
        self.isProcessing = 'no';
        self.processResult = 'fail'
        self.hideProcessResult()
      }
    );

  }

  saveVehicle() {
    let self = this;
    this.isProcessing = 'yes'
    let vehicle = {
      id: this.utilityService.generateID('vehicles'),
      provider: this.vehicle.provider.value,
      type: this.vehicle.type.value,
      numOfSeats: this.vehicle.numOfSeats.value,
      subscribeDate: this.utilityService.formatDate(this.vehicle.subscribeDate.value._i),
      days: this.vehicle.days.value
    };

    let params = new URLSearchParams();
    for (const key in this.vehicle) {
      if (this.vehicle.hasOwnProperty(key)) {
        params.append(key, vehicle[key]);
      }
    }
    let data = params.toString();

    this.httpService.saveNewDataAPI('vehicles', data).subscribe(
      (response: PostResponse) => {
        if (response.code == 200) {
          self.isProcessing = 'no'
          self.processResult = 'success'
          self.hideProcessResult()
        } else {
          self.isProcessing = 'no';
          self.processResult = 'fail'
          self.hideProcessResult()
        }
      },
      error => {
        self.isProcessing = 'no';
        self.processResult = 'fail'
        self.hideProcessResult()
      }
    );
  }

  saveHotel() {
    let self = this;
    this.isProcessing = 'yes'
    let hotel = {
      id: this.utilityService.generateID('hotels'),
      name: this.hotel.name.value,
      address: this.hotel.address.value,
      checkInDate: this.utilityService.formatDate(this.hotel.checkInDate.value._i),
      days: this.hotel.days.value,
      numOfRooms: this.hotel.numOfRooms.value
    };

    let params = new URLSearchParams();
    for (const key in this.hotel) {
      if (this.hotel.hasOwnProperty(key)) {
        params.append(key, hotel[key]);
      }
    }
    let data = params.toString();

    this.httpService.saveNewDataAPI('hotels', data).subscribe(
      (response: PostResponse) => {
        console.log(response);
        if (response.code == 200) {
          self.isProcessing = 'no'
          self.processResult = 'success'
          self.hideProcessResult()
        } else {
          self.isProcessing = 'no';
          self.processResult = 'fail'
          self.hideProcessResult()
        }
      },
      error => {
        self.isProcessing = 'no';
        self.processResult = 'fail'
        self.hideProcessResult()
      }
    );
  }

  saveShip() {
    let self = this;
    this.isProcessing = 'yes'
    let ship = {
      id: this.utilityService.generateID('ships'),
      provider: this.ship.provider.value,
      type: this.ship.type.value,
      journeyType: this.ship.journeyType.value,
      journeyDesc: this.ship.journeyDesc.value,
      departurePort: this.ship.departurePort.value,
      departureDate: this.utilityService.formatDate(this.ship.departureDate.value._i)
    };

    let params = new URLSearchParams();
    for (const key in this.ship) {
      if (this.ship.hasOwnProperty(key)) {
        params.append(key, ship[key]);
      }
    }
    let data = params.toString();

    this.httpService.saveNewDataAPI('ships', data).subscribe(
      (response: PostResponse) => {
        console.log(response);
        if (response.code == 200) {
          self.isProcessing = 'no'
          self.processResult = 'success'
          self.hideProcessResult()
        } else {
          self.isProcessing = 'no';
          self.processResult = 'fail'
          self.hideProcessResult()
        }
      },
      error => {
        self.isProcessing = 'no';
        self.processResult = 'fail'
        self.hideProcessResult()
      }
    );
  }


}
