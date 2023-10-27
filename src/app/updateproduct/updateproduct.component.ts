import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-updateproduct',
  templateUrl: './updateproduct.component.html',
  styleUrls: ['./updateproduct.component.less']
})
export class UpdateproductComponent implements OnInit {
  productData: undefined | product
  message: string | undefined
  constructor(private _route: ActivatedRoute, private _product: ProductService, private _router: Router) { }
  ngOnInit(): void {
    let productId = this._route.snapshot.paramMap.get('id')
    productId && this._product.getProductById(productId).subscribe((data) => {
      this.productData = data
    })
  }

  updateProducts(data: product) {
    if (this.productData) {
      data.id = this.productData.id
    }
    this._product.updateProduct(data).subscribe((result) => {
      if (result) {
        this.message = "Product Updated Successfully"
      }
    })
    setTimeout(() => {
      this.message = undefined
    }, 3000)
    this._router.navigate(['seller-home'])
  }
}
