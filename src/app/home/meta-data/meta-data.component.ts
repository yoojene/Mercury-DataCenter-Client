import { Component, OnInit, AfterViewInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-meta-data',
  templateUrl: './meta-data.component.html',
  styleUrls: ['./meta-data.component.scss']
})
export class MetaDataComponent implements OnInit, AfterViewInit {

  finalData = {}

  nationalityList = ['China', 'USA', 'Japan', 'British']
  nationality = ''

  cabinList = []
  cabin = ''

  airlineList = []
  airline = ''

  // Vehicle Provider 
  vehicleProviderList = [
    {
      'name': 'Mercury',
      'type': ['Sprinter', 'SUV']
    }
  ]
  newVehicleProvider = {
    name: '',
    type: []
  }
  vehicleProviderName = ''
  vehicleProviderType = ''
  showVehicleProviderEditor = false

  // Ship Provider
  shipProviderList = [
    {
      'name': 'Mercury',
      'type': ['Sprinter', 'SUV']
    }
  ]
  newShipProvider = {
    name: '',
    type: []
  }
  shipProviderName = ''
  shipProviderType = ''
  showShipProviderEditor = false

  // Hotel Variables
  hotelList = []


  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {

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

}
