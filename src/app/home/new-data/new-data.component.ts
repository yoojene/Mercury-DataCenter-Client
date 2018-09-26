import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-data',
  templateUrl: './new-data.component.html',
  styleUrls: ['./new-data.component.scss']
})
export class NewDataComponent implements OnInit {
  nationalityList = ['China', 'USA', 'Japan', 'Taiwan', 'HangKong', 'Canda', 'Britihsh']
  customer = {
    id: '',
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required]),
    nationality: new FormControl('', [Validators.required])
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

  saveCustomer(){
    console.log(this.customer)
  }



}
