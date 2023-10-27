import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.less']
})
export class AddProductComponent {
  message: string | undefined

  constructor(private _product: ProductService, private _router: Router) { }
  addProducts(data: product) {
    return this._product.addProduct(data).subscribe((result) => {
      if (result) {
        this.message = 'Product added successfully!'
        this._router.navigate(['seller-home'])
      }
      setTimeout(() => (this.message = undefined), 3000)
    })
  }
}
