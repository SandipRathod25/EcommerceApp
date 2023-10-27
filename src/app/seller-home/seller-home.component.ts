import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.less']
})
export class SellerHomeComponent implements OnInit {
  productList: undefined | product[]
  message: string | undefined

  constructor(private _product: ProductService) { }
  ngOnInit(): void {
    this.lists()
  }

  deleteProduct(id: number) {
    this._product.deleteProduct(id).subscribe((result) => {
      if (result) {
        this.message = 'Product deleted successfully!'
        this.lists()
      }
      setTimeout(() => (this.message = undefined), 3000)
    })
  }

  lists() {
    this._product.productList().subscribe((result) => {
      this.productList = result;
    })
  }

}
