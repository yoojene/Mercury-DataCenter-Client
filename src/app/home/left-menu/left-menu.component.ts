import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.scss']
})
export class LeftMenuComponent implements OnInit {
  menuList = [
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
      icon: 'directions_car',
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
    },
    {
      title: 'Meta data',
      icon: 'toc',
      url: 'meta-data'
    },
  ]
  currentIndex = 0
  constructor(private router: Router) { }

  ngOnInit() {
    console.log(this.menuList)
  }

  handleItemClick(index) {
    console.log(index)
    console.log(this.menuList[index].url)
    this.currentIndex = index;
    this.router.navigateByUrl(`home/${this.menuList[index].url}`)
  }

}
