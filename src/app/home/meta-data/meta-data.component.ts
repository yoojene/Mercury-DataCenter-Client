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

  shipProviderList = []
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

}
