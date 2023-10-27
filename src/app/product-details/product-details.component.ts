import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { cart, product } from '../data-type';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.less']
})
export class ProductDetailsComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute, private _product: ProductService) { }
  productData: undefined | product
  quantityValue: number = 1
  removeCart: boolean = false
  productAdded: string = ''
  cartData: product | undefined
  ngOnInit(): void {
    let productID = this.activatedRoute.snapshot.paramMap.get('productId')
    productID && this._product.getProductById(productID).subscribe((result) => {
      this.productData = result;

      let cartData = localStorage.getItem('localCart')
      if (productID && cartData) {
        let items = JSON.parse(cartData)
        items = items.filter((item: product) => productID == item.id.toString())
        if (items.length) {
          this.cartData = items[0]
          this.removeCart = true;
        }
        else {
          this.removeCart = false;
        }
      }
      let user = localStorage.getItem('user')
      if (user) {
        let userId = user && JSON.parse(user).id
        this._product.getCartList(userId)
        this._product.cartData.subscribe((result) => {
          let item = result.filter((item: product) => productID?.toString() === item.productId?.toString())
          if (item.length) {
            this.removeCart = true
          }
        })
      }
    })
  }

  handleQuantity(val: string) {
    if (this.quantityValue < 20 && val === 'max') {
      this.quantityValue += 1;
      console.log(this.quantityValue)
    }
    else if (this.quantityValue > 1 && val === 'min') {
      this.quantityValue -= 1;
    }
  }

  addToCart() {
    if (this.productData) {
      this.productData.quantity = this.quantityValue
      if (!localStorage.getItem('user')) {
        this._product.addToCart(this.productData)
        this.removeCart = true;
      }
      else {
        let user = localStorage.getItem('user')
        let userId = user && JSON.parse(user).id
        console.log(userId)
        let cartData: cart = {
          ...this.productData,
          userId: userId,
          productId: this.productData.id
        }
        delete cartData.id
        this._product.addToCartPost(cartData).subscribe((result) => {
          if (result) {
            this._product.getCartList(userId)
            this.removeCart = true;
          }
        })
      }
    }
  }
  removeToCart(productID: number) {
    if (!localStorage.getItem('user')) {
      this._product.removeItemFromCart(productID)
      this.removeCart = false;
    }
    else {
      let user = localStorage.getItem('user')
      let userId = user && JSON.parse(user).id
      this.cartData && this._product.removeToCart(this.cartData.id).subscribe((result) => {
        if (result) {
          this._product.getCartList(userId)
        }
      })
      this.removeCart = false
    }

  }
}

