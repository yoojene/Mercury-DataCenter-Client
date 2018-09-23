import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  hide = true;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  getEmailErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a correct email' :
      this.email.hasError('email') ? 'Not a valid email' : '';
  }
  getPasswordErrorMessage() {
    if (this.password.hasError('required')) {
      return 'You must enter a password'
    }
  }

  // handle click sign in button
  signin() {
    console.log(this.email.value);
    console.log(this.password.value);
    if (this.email.value == 'a@a.a' && this.password.value == '1') {
      this.router.navigateByUrl('/home/overview')
    }
  }





}
