import { Component } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.less']
})
export class UserProfileComponent {

  sellerStore = localStorage.getItem('seller')
  sellerData = this.sellerStore && JSON.parse(this.sellerStore)
  name = this.sellerData.name;
  email = this.sellerData.email;
}
