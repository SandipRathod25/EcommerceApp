import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { cart, product } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  cartData = new EventEmitter<product[] | []>()

  constructor(private _http: HttpClient) { }

  addProduct(data: product) {
    return this._http.post("http://localhost:3000/products", data)
  }

  productList() {
    return this._http.get<product[]>("http://localhost:3000/products")
  }

  deleteProduct(id: number) {
    return this._http.delete(`http://localhost:3000/products/${id}`)
  }

  getProductById(id: string) {
    return this._http.get<product>(`http://localhost:3000/products/${id}`)
  }

  updateProduct(product: product) {
    return this._http.put<product>(`http://localhost:3000/products/${product.id}`, product)
  }

  popularProduct() {
    return this._http.get<product[]>("http://localhost:3000/products?_limit=5")
  }

  trendingProduct() {
    return this._http.get<product[]>("http://localhost:3000/products?_limit=11")
  }

  searchProduct(query: string) {
    return this._http.get<product[]>(`http://localhost:3000/products?q=${query}`)
  }

  addToCart(data: product) {
    let cartdata = []
    let localCart = localStorage.getItem('localCart')
    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]))
      this.cartData.emit([data])
    }
    else {
      cartdata = JSON.parse(localCart)
      cartdata.push(data)
      localStorage.setItem('localCart', JSON.stringify(cartdata))
    }
    this.cartData.emit(cartdata)
  }

  removeItemFromCart(productId: number) {
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      let items: product[] = JSON.parse(cartData)
      items = items.filter((item: product) => productId != item.id)
      localStorage.setItem('localCart', JSON.stringify(items))
      this.cartData.emit(items)
    }
  }

  addToCartPost(cartData: cart) {
    return this._http.post("http://localhost:3000/cart", cartData)
  }

  getCartList(userId: number) {
    return this._http.get<product[]>('http://localhost:3000/cart?userId=' + userId)
      .subscribe((result) => {
        console.log(result)
        if (result && result) {
          this.cartData.emit(result)
        }
      })
  }

  removeToCart(cartId: number) {
    return this._http.delete('http://localhost:3000/cart/' + cartId)
  }

  currentCart() {
    let userStore = localStorage.getItem('user')
    let userData = userStore && JSON.parse(userStore)
    return this._http.get<cart[]>("http://localhost:3000/cart?userId=" + userData.id)
  }

}
