import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.scss']
})
export class LeftMenuComponent implements OnInit {
  statisticsList = [
    {
      title: 'Overview',
      icon: 'info',
      url: 'overview'
    },
    {
      title: 'Customer',
      icon: 'account_circle',
      url: 'customer'
    },
    {
      title: 'Vehicle',
      icon: 'airport_shuttle',
      url: 'vehicle'
    },
    {
      title: 'Airline',
      icon: 'airplanemode_active',
      url: 'airline'
    },
    {
      title: 'Ship',
      icon: 'directions_boat',
      url: 'ship'
    },
    {
      title: 'Hotel',
      icon: 'local_hotel',
      url: 'hotel'
    }
  ];

  operationList = [
    {
      title: 'Edit Meta Data',
      icon: 'extension',
      url: 'meta-data'
    },
    {
      title: 'Add New Data',
      icon: 'edit',
      url: 'new-data'
    }
  ]

  currentStatisticsIndex = 0
  currentOperationIndex = 0
  indexType = 'statistics'
  constructor(private router: Router) { }

  ngOnInit() {
    // console.log(this.statisticsList)
  }

  handleStatisticsItemClick(index) {
    // console.log(index)
    // console.log(this.statisticsList[index].url)
    this.currentStatisticsIndex = index;
    this.indexType = 'statistics'
    this.router.navigateByUrl(`home/${this.statisticsList[index].url}`)
  }

  handleOperationItemClick(index) {
    // console.log(index)
    // console.log(this.operationList[index].url)
    this.currentOperationIndex = index;
    this.indexType = 'operation'
    this.router.navigateByUrl(`home/${this.operationList[index].url}`)
  }
}
