import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddToCartServiceService } from 'src/app/customer-service/add-to-cart-service.service';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.scss']
})
export class CouponComponent implements OnInit {

  public coupons:number[]=[20,25];
  constructor(public cart:AddToCartServiceService,
              public router:Router) { }


  ngOnInit(): void {
  }

  applyDiscount(voucher:any){
    console.log(voucher);
     this.cart.getVoucher(voucher);
    this.router.navigate(['/addtocart'])

    //  this.cart.coupon
  }

}
