import { saveAs } from 'file-saver';
import { Product } from './../model/product.model';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { AddToCartServiceService } from 'src/app/customer-service/add-to-cart-service.service';
import { BillService } from 'src/app/services/bill.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import swals from 'sweetalert';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  dataSource: any = [];
  newData:any=[];
  manageOrderForm: any = FormGroup;
  category: any = [];
  product: any = [];
  price: any;
  totalAmount: number = 0;
  responseMessage: any;


  constructor(private FormBuilder:FormBuilder,
    private billServuce: BillService,
    private ngxService: NgxUiLoaderService,
    private SnackbarService: SnackbarService,
    public addTocartService:AddToCartServiceService,
    public router:Router) { }

  ngOnInit(): void {
    this.getCheckOutData();

    this.manageOrderForm = this.FormBuilder.group({
      name: [
        null,
        [Validators.required, Validators.pattern(GlobalConstants.nameRegex)],
      ],
      email: [
        null,
        [Validators.required, Validators.pattern(GlobalConstants.emialRegex)],
      ],
      contactNumber: [
        null,
        [
          Validators.required,
          Validators.pattern(GlobalConstants.contactNumberRegex),
        ],
      ],
      paymentMethod: [null, [Validators.required]],
      product: [this.newData],
      category: [this.myCategory],
      quantity: [""+this.newData.quantity],
      price: [this.newData.price],
      total: [500],
    });
  }


  cancle()
  {
    this.router.navigateByUrl("/addtocart")
  }

  add()
  {
    var formData = this.manageOrderForm.value;//userdetails

    console.log(formData);

    var data = {
      name: formData.name,
      email: formData.email,
      contactNumber: formData.contactNumber,
      paymentMethod: formData.paymentMethod,
      totalAmount: this.totalAmount.toString(),
      productDetails:JSON.stringify([this.newData])
      }

      console.log(data);

      this.billServuce.generateReport(data).subscribe((Response:any)=>{

        // this.SnackbarService.openSnackBar(
        //   GlobalConstants.thankyYou,
        //   'success'
        // );

        this.downloadFile(Response?.uuid);
        this.manageOrderForm.reset();
        this.dataSource=[];
        this.totalAmount=0;
        this.addTocartService.cartPrice=0;
        this.addTocartService.itemCount=0;

        swals('Payment Success','','success')
         this.router.navigateByUrl("/exploremore")

      },(error: any) => {
        console.log(error);

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
      )
  }
  myCategory:any

  getCheckOutData(){
    return this.addTocartService.dataSource.filter(data=>{

      this.myCategory={
        id:data.product.categoryId,
        name:data.product.categoryName,
      }

      this.newData={
          id:data.product.id,
          name:data.product.name,
          category: this.myCategory.name,
          price:data.product.price,
          total:600,
          quantity:""+data.quantity

        }
        console.log(this.newData);

    });
  }


  downloadFile(fileName:string){
    var data={
      uuid:fileName,
    }

    this.billServuce.getPdf(data).subscribe((response:any)=>{
      saveAs(response,fileName+' .pdf');
      this.ngxService.stop();
    })
    }




}
