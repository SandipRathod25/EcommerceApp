import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SellerComponent } from './seller/seller.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { sellerGaurdGuard } from './seller-gaurd.guard';
import { AddProductComponent } from './add-product/add-product.component';
import { UpdateproductComponent } from './updateproduct/updateproduct.component';
import { SearchComponent } from './search/search.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderComponent } from './order/order.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'seller', component: SellerComponent },
  { path: 'seller-home', component: SellerHomeComponent, canActivate: [sellerGaurdGuard] },
  { path: 'add-product', component: AddProductComponent, canActivate: [sellerGaurdGuard] },
  { path: 'update-product/:id', component: UpdateproductComponent, canActivate: [sellerGaurdGuard] },
  { path: 'search/:query', component: SearchComponent },
  { path: 'details/:productId', component: ProductDetailsComponent },
  { path: 'user-auth', component: UserAuthComponent },
  { path: 'cart-details', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'order', component: OrderComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
