import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  constructor(private _product: ProductService) { }
  popularProductData: undefined | product[]
  trendingProduct: undefined | product[]
  ngOnInit(): void {
    this._product.popularProduct().subscribe((result) => {
      this.popularProductData = result;
    })

    this._product.trendingProduct().subscribe((result) => {
      this.trendingProduct = result
    })
  }


}
