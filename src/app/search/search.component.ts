import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.less']
})
export class SearchComponent implements OnInit {
  constructor(private _activatedRoute: ActivatedRoute, private _product: ProductService) { }
  searchProductList: undefined | product[]
  ngOnInit(): void {
    let query = this._activatedRoute.snapshot.paramMap.get('query');
    query && this._product.searchProduct(query).subscribe((result) => {
      this.searchProductList = result;
    })
  }
}
