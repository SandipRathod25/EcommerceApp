import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { SignUp, login } from '../data-type';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.less']
})
export class SellerComponent implements OnInit {
  constructor(private _seller: SellerService, private _router: Router) { }
  authError: string = ''
  ngOnInit(): void {
    this._seller.reloadSeller()
  }
  SignUp(data: SignUp): void {
    this._seller.userSignup(data)
  }

  Login(data: login): void {
    this.authError = ''
    this._seller.userLogin(data)
    this._seller.isLoginError.subscribe((isError) => {
      if (isError) {
        this.authError = "Email of Password is not correct"
      }
    })
  }

  showLogin = false;

  openLogin() {
    this.showLogin = true;
  }
  openSignup() {
    this.showLogin = false;
  }
}
