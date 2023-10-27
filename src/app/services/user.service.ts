import { EventEmitter, Injectable } from '@angular/core';
import { SignUp, login } from '../data-type';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  invalidUserAuth = new EventEmitter<boolean>(false)

  constructor(private _http: HttpClient, private _router: Router) { }
  userSignup(user: SignUp) {
    this._http.post('http://localhost:3000/users', user, { observe: 'response' }).subscribe((result) => {
      if (result) {
        localStorage.setItem('user', JSON.stringify(result.body))
        console.log(result)
        this._router.navigate(['/'])
      }
    })
  }

  userLogin(data: login) {
    this._http.get(`http://localhost:3000/users?email=${data.email}&password=${data.password}`, { observe: 'response' }).subscribe((result: any) => {
      if (result && result.body && result.body.length) {
        this.invalidUserAuth.emit(false)
        localStorage.setItem('user', JSON.stringify(result.body[0]))
        this._router.navigate(['/'])
      }
      else {
        this.invalidUserAuth.emit(true)
      }
    })
  }

  userReload() {
    if (localStorage.getItem('user')) {
      this._router.navigate(['/'])
    }
  }


}
