import { Injectable } from '@angular/core';
import { Product } from '../customer/model/product.model';

@Injectable({
  providedIn: 'root'
})
export class AddToCartServiceService {

  public lines: CartLine[] = [];
  public itemCount: number = 0;
  public cartPrice: number = 0;
  public dataSource:any[]=[];
  public coupon:any;
  constructor() { }



  addCart(product: Product, quantity: number = 1) {


        let line = this.lines.find(line => line.product.id == product.id);
        if (line != undefined) {
            line.quantity += quantity;
        } else {
            this.lines.push(new CartLine(product, quantity));
        }
        this.recalculate();
    }

  private recalculate() {
    this.itemCount = 0;
    this.cartPrice = 0;
    this.lines.forEach(l => {
        this.itemCount += l.quantity;

       this.cartPrice += (l.quantity * l.product.price);
    })
}

getVoucher(voucher:any){
   console.log(voucher);
    this.coupon=voucher;
    // return voucher;

}

updateQuantity(product: Product, quantity: any) {
  let line = this.lines.find(line => line.product.id == product.id);
  if (line != undefined) {
      line.quantity = Number(quantity.target.value);
  }
  this.recalculate();
}

removeLine(id: number) {
  let index = this.lines.findIndex(line => line.product.id == id);
  this.lines.splice(index, 1);
  this.recalculate();
}

checkoutData(data:any){
console.log("in service");
console.log(data);

return this.dataSource=data;


}

}

export class CartLine {

  constructor(public product: Product,
      public quantity: number) {}

  get lineTotal() {
     return this.quantity * this.product.price;
  }
}
