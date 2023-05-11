import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ProductService } from '../services/product.service';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarService } from '../services/snackbar.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalConstants } from '../shared/global-constants';
import { AddToCartServiceService } from '../customer-service/add-to-cart-service.service';
import { Product } from './model/product.model';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent implements OnInit {
  public selectedCategory = null;
  public productsPerPage = 2;
  public selectedPage = 1;
 public products:any;
  dataSource: any;

  responseMessage: any;

  constructor(
    private ngxService: NgxUiLoaderService,
    private productService: ProductService,
    private dialog: MatDialog,
    private SnackbarService: SnackbarService,
    private router: Router,
    private AddtoCartService: AddToCartServiceService,
  ) {}

  ngOnInit(): void {
     let pagenindex=(this.selectedPage-1)*this.productsPerPage;
    //  this.products=this.dataSource.slice(pagenindex,this.productsPerPage);
    this.ngxService.start(); //starting loader
    this.tableData(); //
  }

  tableData() {
    this.productService
      .getProduct() //1 kya chahaiye  //product ditails chahaiye

      .subscribe(
        //2  kya mila
        (response: any) => {
          // console.log(response);

          this.ngxService.stop();

          this.dataSource = response;
          // this.products=response;

          // this.dataSource = new MatTableDataSource(response);
          console.log(this.dataSource);
        },
        (error: any) => {
          this.ngxService.stop();
          console.log(error.error?.message);
          if (error.error?.message) {
            this.responseMessage = error.error?.message;
          } else {
            this.responseMessage = GlobalConstants.genricError;
          }
          this.SnackbarService.openSnackBar(
            this.responseMessage,
            GlobalConstants.error
          );
        }
      );
  }

  addToCart(data: any) {
    console.log('hello');

    this.AddtoCartService.addCart(data);

    this.router.navigateByUrl('/addtocart');
  }

  displayAddToCart() {
    this.router.navigateByUrl('/addtocart');
  }


  changePage(newPage: number) {
    this.selectedPage = newPage;
}

changePageSize(event:Event) {
  const newSize=(event.target as HTMLInputElement).value
    this.productsPerPage = Number(newSize);
    this.changePage(1);
}


get pageNumbers(): number[] {
   return Array(Math.ceil(this.dataSource.length/ this.productsPerPage))
           .fill(0).map((x, i) => i + 1);
}



}
