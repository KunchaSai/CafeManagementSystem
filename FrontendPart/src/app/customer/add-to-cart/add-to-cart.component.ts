import { Component, OnInit } from '@angular/core';
import { AddToCartServiceService } from 'src/app/customer-service/add-to-cart-service.service';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss']
})
export class AddToCartComponent implements OnInit {

  constructor(public cart:AddToCartServiceService) { }

  ngOnInit(): void {
  }

}
