import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddToCartServiceService } from 'src/app/customer-service/add-to-cart-service.service';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.scss']
})
export class CardDetailComponent implements OnInit {

  public discount:number=-9;

  status:boolean=false;



  constructor(public cart:AddToCartServiceService,
              public router:Router) {
                // this.coupon=this.cart.coupon;
                this.getVoucher();
               }

  ngOnInit(): void {
    // this.getVoucher();
    console.log(this.getVoucher);

  }
  checkOutProducts(data:Event)
  {
    console.log(data.target);
  }

  onedata(data:any){
    console.log("1 data ");
    console.log(data);
    this.cart.checkoutData(data);

  }
  applycoupon(){
    this.router.navigateByUrl("/coupon")

    }

getVoucher(){
   console.log(this.cart.coupon);
   console.log(this.discount+"  discount");

   if((this.cart.cartPrice>=500  && this.cart.cartPrice<=1499)  && this.cart.coupon==20 ){
    this.discount=this.cart.cartPrice*(this.cart.coupon/100);

   } else if(this.cart.cartPrice>=1500 && this.cart.coupon==25 ){
    this.discount=this.cart.cartPrice*(this.cart.coupon/100);
   }
    //  this.discount=this.cart.cartPrice*(this.cart.coupon/100);
    console.log(this.discount+"  discount");
    if(this.discount>=0){
      this.status=true;
    }
    return this.discount;
};



}
