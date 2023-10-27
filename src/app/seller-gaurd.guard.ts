import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SellerService } from './services/seller.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class sellerGaurdGuard {
  constructor(private _seller: SellerService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    if (localStorage.getItem('seller')) {
      return this._seller.isTested;
    }
    return this._seller.isSellerLoggedIn;
  }
}
