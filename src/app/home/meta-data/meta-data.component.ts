import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpService } from "../../service/http.service";
import {
  MetaHotelProvider,
  MetaVehicleProvider,
  MetaShipProvider
} from "../../module/MetaData";

declare var $: any;

@Component({
  selector: 'app-meta-data',
  templateUrl: './meta-data.component.html',
  styleUrls: ['./meta-data.component.scss']
})
export class MetaDataComponent implements OnInit {

  finalData = {
    nationalities: [],
    cabin: [],
    airline: [],
    vehicleProvider: [],
    shipProvider: [],
    hotel: []
  }

  nationalityList = []
  nationality = ''

  cabinList = []
  cabin = ''

  airlineList = []
  airline = ''

  // Vehicle Provider 
  vehicleProviderList = []
  newVehicleProvider = {
    name: '',
    type: []
  }
  vehicleProviderName = ''
  vehicleProviderType = ''
  showVehicleProviderEditor = false

  // Ship Provider
  shipProviderList = []
  newShipProvider = {
    name: '',
    type: []
  }
  shipProviderName = ''
  shipProviderType = ''
  showShipProviderEditor = false

  // Hotel Variables
  hotelList = []
  newHotel = {
    name: '',
    address: ''
  }
  hotelName = ''
  hotelAddress = ''
  showHotelEditor = false


  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.httpService.fetchAllMetaData().subscribe(response => {
      this.airlineList = response['airline']
      this.cabinList = response['cabin']
      this.nationalityList = response['nationalities']
      this.hotelList = response['hotel']
      this.vehicleProviderList = response['vehicleProvider']
      this.shipProviderList = response['shipProvider']
    })
  }

  nationalityOkBtn() {
    this.nationalityList.push(this.nationality)
    this.nationality = ''
  }

  cabinOkBtn() {
    this.cabinList.push(this.cabin)
    this.cabin = ''
  }

  airlineOkBtn() {
    this.airlineList.push(this.airline)
    this.airline = ''
  }

  // Vehicle Logics
  addNewVehicleBtn() {
    this.showVehicleProviderEditor = true;
  }

  vehicleProviderNameOkBtn() {
    this.newVehicleProvider.name = this.vehicleProviderName
    this.vehicleProviderName = ''
  }

  vehicleProviderTypeOkBtn() {
    this.newVehicleProvider.type.push(this.vehicleProviderType)
    this.vehicleProviderType = ''
  }

  cancelVehicleModal() {
    this.vehicleProviderName = ''
    this.vehicleProviderType = ''
    this.newVehicleProvider = {
      name: '',
      type: []
    }
    this.showVehicleProviderEditor = false;
  }

  finishVehicleModal() {
    if (!this.newVehicleProvider.name || this.newVehicleProvider.type.length == 0) {
      alert('Please input the provider name and type');
      return;
    }
    this.vehicleProviderList.push({
      name: this.newVehicleProvider.name,
      type: this.newVehicleProvider.type
    })
    this.vehicleProviderName = ''
    this.vehicleProviderType = ''
    this.newVehicleProvider = {
      name: '',
      type: []
    }
    this.showVehicleProviderEditor = false;
  }

  // Ship Logics
  addNewShipBtn() {
    this.showShipProviderEditor = true;
  }

  shipProviderNameOkBtn() {
    this.newShipProvider.name = this.shipProviderName
    this.shipProviderName = ''
  }

  shipProviderTypeOkBtn() {
    this.newShipProvider.type.push(this.shipProviderType)
    this.shipProviderType = ''
  }

  cancelShipModal() {
    this.shipProviderName = ''
    this.shipProviderType = ''
    this.newShipProvider = {
      name: '',
      type: []
    }
    this.showShipProviderEditor = false;
  }

  finishShipModal() {
    if (!this.newShipProvider.name || this.newShipProvider.type.length == 0) {
      alert('Please input the provider name and type');
      return;
    }
    this.shipProviderList.push({
      name: this.newShipProvider.name,
      type: this.newShipProvider.type
    })
    this.shipProviderName = ''
    this.shipProviderType = ''
    this.newShipProvider = {
      name: '',
      type: []
    }
    this.showShipProviderEditor = false;
  }

  // Hotel Logics
  hotelNameOkBtn() {
    this.newHotel.name = this.hotelName
    this.hotelName = ''
  }

  addNewHotelBtn() {
    this.showHotelEditor = true
  }

  hotelAddressOkBtn() {
    this.newHotel.address = this.hotelAddress
    this.hotelAddress = ''
  }

  cancelHotelEdit() {
    this.newHotel.name = ''
    this.newHotel.address = ''
    this.hotelName = ''
    this.hotelAddress = ''
    this.showHotelEditor = false;
  }

  finishHotelEdit() {
    this.hotelList.push({
      name: this.newHotel.name,
      address: this.newHotel.address
    })
    this.newHotel = {
      name: '',
      address: ''
    }
    this.hotelName = ''
    this.hotelAddress = ''
    this.showHotelEditor = false;
  }

  saveAllData() {
    this.finalData.nationalities = this.nationalityList
    this.finalData.cabin = this.cabinList
    this.finalData.airline = this.airlineList
    this.finalData.vehicleProvider = this.vehicleProviderList
    this.finalData.shipProvider = this.shipProviderList
    this.finalData.hotel = this.hotelList
    console.log(this.finalData)
    let data = JSON.stringify(this.finalData)
    this.httpService.postAllMetaData(data).subscribe(
      response => {
        console.log(response)
      },
      error => {
        console.log(error)
      }
    )
  }

  removeItem(targetIndex, listName) {
    switch (listName) {
      case 'nationalityList':
        this.nationalityList = this.nationalityList.filter(function (item, index) {
          return targetIndex != index
        })
        break;
      case 'airlineList':
        this.airlineList = this.airlineList.filter(function (item, index) {
          return targetIndex != index
        })
        break;
      case 'cabinList':
        this.cabinList = this.cabinList.filter(function (item, index) {
          return targetIndex != index
        })
        break;
      case 'vehicleProviderList':
        this.vehicleProviderList = this.vehicleProviderList.filter(function (item, index) {
          return targetIndex != index
        })
        break;
      case 'hotelList':
        this.hotelList = this.hotelList.filter(function (item, index) {
          return targetIndex != index
        })
        break;
      case 'shipProviderList':
        this.shipProviderList = this.shipProviderList.filter(function (item, index) {
          return targetIndex != index
        })
        break;
      default:
        break;
    }
  }

}
