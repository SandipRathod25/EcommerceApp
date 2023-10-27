import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { SignUp, login } from '../data-type';
import { BehaviorSubject } from 'rxjs'
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class SellerService {
  isSellerLoggedIn = new BehaviorSubject<boolean>(false)
  isTested = new BehaviorSubject<boolean>(true)
  isLoginError = new EventEmitter<boolean>(false)


  constructor(private _http: HttpClient, private _router: Router) { }
  userSignup(data: SignUp) {
    this._http.post('http://localhost:3000/sellers', data, { observe: 'response' })
      .subscribe((result: any) => {
        this.isSellerLoggedIn.next(true)
        localStorage.setItem('seller', JSON.stringify(result.body))
        this._router.navigate(['seller-home'])
      })
  }

  reloadSeller() {
    if (localStorage.getItem('seller')) {
      this.isSellerLoggedIn.next(true)
      this._router.navigate(['seller-home'])
    }
  }

  userLogin(data: login) {
    this._http.get(`http://localhost:3000/sellers?email=${data.email}&password=${data.password}`,
      { observe: 'response' }).subscribe((result: any) => {
        if (result && result.body && result.body.length) {
          localStorage.setItem('seller', JSON.stringify(result.body[0]))
          this._router.navigate(['seller-home'])
        }
        else {
          console.log("fail")
          this.isLoginError.emit(true)
        }
      })
  }
}
