import { Component, OnInit } from '@angular/core';
import { SignUp, cart, login, product } from '../data-type';
import { UserService } from '../services/user.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.less']
})
export class UserAuthComponent implements OnInit {
  errorMessage: string = ''
  constructor(private _user: UserService, private _product: ProductService) { }
  authError: string = ''
  ngOnInit(): void {
    this._user.userReload()
  }
  SignUp(data: SignUp) {
    this._user.userSignup(data)
  }

  Login(data: login): void {
    this._user.userLogin(data)
    this._user.invalidUserAuth.subscribe((result) => {
      if (result) {
        this.errorMessage = "Please Enter valid Credentials!"
      }
      else {
        this.localCartToRemoteCart()
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

  localCartToRemoteCart() {
    let data = localStorage.getItem('localCart')
    let user = localStorage.getItem('user')
    let userId = user && JSON.parse(user).id
    if (data) {
      let cartDataList = JSON.parse(data)


      cartDataList.forEach((product: product, index: number) => {
        let cartData: cart = {
          ...product,
          productId: product.id,
          userId,
        }
        delete cartData.id
        setTimeout(() => {
          this._product.addToCartPost(cartData).subscribe((result) => {
            if (result) {
              console.log("item stored in db")
            }
          })
          if (cartDataList.length === index + 1) {
            localStorage.removeItem('localCart')
          }
        }, 1000)

      });
    }
    setTimeout(() => {
      this._product.getCartList(userId)
    }, 2000)
  }
}
