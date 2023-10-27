import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { cart } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.less']
})
export class CartComponent implements OnInit {
  cartData: cart[] | undefined
  constructor(private _product: ProductService, private _router: Router) { }
  ngOnInit(): void {
    this._product.currentCart().subscribe((result) => {
      this.cartData = result
    })
  }

  checkout() {
    this._router.navigate(['checkout'])
  }

}
