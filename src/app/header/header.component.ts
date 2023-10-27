import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  menuType: string = 'default'
  sellerName: string = '';
  sellerEmail: string = '';
  userName: string = ''
  searchResult: undefined | product[]
  cartItems = 0
  constructor(private _router: Router, private _dialog: MatDialog, private _product: ProductService) { }
  ngOnInit(): void {
    this._router.events.subscribe((value: any) => {
      if (value.url) {
        if (localStorage.getItem('seller') && value.url.includes('seller')) {
          this.menuType = 'seller'
          if (localStorage.getItem('seller')) {
            let sellerStore = localStorage.getItem('seller')
            let sellerData = sellerStore && JSON.parse(sellerStore)
            this.sellerName = sellerData.name;
            this.sellerEmail = sellerData.email;
          }
        }
        else if (localStorage.getItem('user')) {
          let userStore = localStorage.getItem('user')
          let userData = userStore && JSON.parse(userStore)
          this.userName = userData.name
          this.menuType = 'user'
          this._product.getCartList(userData.id)
        }
        else {
          this.menuType = 'default'
        }
      }
    })

    let cartData = localStorage.getItem('localCart')
    if (cartData) {
      this.cartItems = JSON.parse(cartData).length
    }

    this._product.cartData.subscribe((result) => {
      this.cartItems = result.length
    })
  }
  logout() {
    localStorage.removeItem('seller')
    this._router.navigate(['/'])
  }

  logoutUser() {
    localStorage.removeItem('user')
    this._router.navigate(['/'])
    this._product.cartData.emit([])
  }

  redirectToDeatils(id: number) {
    this._router.navigate(['/details/' + id])
  }


  openDialog(): void {
    const dialogRef = this._dialog.open(UserProfileComponent, {
      data: { name: this.sellerName, animal: this.sellerEmail },
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  searchProduct(query: KeyboardEvent) {
    if (query) {
      let element = query.target as HTMLInputElement;
      this._product.searchProduct(element.value).subscribe((result) => {
        if (result.length > 7) {
          result.length = 7
        }
        this.searchResult = result
      })
    }
  }
  hideSearch() {
    this.searchResult = undefined
  }

  searchSubmit(value: string) {
    this._router.navigate([`search/${value}`])
  }
}
