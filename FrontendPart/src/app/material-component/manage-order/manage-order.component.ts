import { BillService } from './../../services/bill.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { error, log } from 'console';
import { saveAs } from 'file-saver';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-manage-order',
  templateUrl: './manage-order.component.html',
  styleUrls: ['./manage-order.component.scss'],
})
export class ManageOrderComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'category',
    'price',
    'quantity',
    'total',
    'edit',
  ];
  dataSource: any = [];
  manageOrderForm: any = FormGroup;
  category: any = [];
  product: any = [];
  price: any;
  totalAmount: number = 0;
  responseMessage: any;

  constructor(
    private ngxService: NgxUiLoaderService,
    private productService: ProductService,
    private categoryService: CategoryService,
    private billServuce: BillService,
    private SnackbarService: SnackbarService,
    private formBuild: FormBuilder
  ) {}

  ngOnInit(): void {
    this.ngxService.start();
    this.getCategories();
    this.manageOrderForm = this.formBuild.group({
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
      product: [null, [Validators.required]],
      category: [null, [Validators.required]],
      quantity: [null, [Validators.required]],
      price: [null, [Validators.required]],
      total: [0, [Validators.required]],
    });
  }

  getCategories() {
    this.categoryService.getFilteredCategory().subscribe(
      (response: any) => {

        this.ngxService.stop();
        this.category = response;
      },
      (error: any) => {
        this.ngxService.stop();
        console.log(error);
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = GlobalConstants.genricError;
        }
        this.SnackbarService.openSnackBar(this.responseMessage, 'success');
      }
    );
  }

  getProductByCategory(value: any) {
    this.productService.getProductByCategory(value.id).subscribe(
      (response: any) => {
        this.product = response;

        this.manageOrderForm.controls['price'].setValue(response.price);

        this.manageOrderForm.controls['quantity'].setValue('1');
        this.manageOrderForm.controls['total'].setValue(this.price * 1);
      },
      (error: any) => {
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
    );
  }

  getProductDetails(value: any) {
    console.log(value.id);

    this.productService.getById(value.id).subscribe(
      (response: any) => {
        this.price = response.price;

        this.manageOrderForm.controls['price'].setValue(response.price);

        this.manageOrderForm.controls['quantity'].setValue('1');
        this.manageOrderForm.controls['total'].setValue(this.price * 1);
      },
      (error: any) => {
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
    );
  }

  setQuantity(value: any) {
    var temp = this.manageOrderForm.controls['quantity'].value;
    if (temp > 0) {
      this.manageOrderForm.controls['total'].setValue(
        this.manageOrderForm.controls['quantity'].value *
          this.manageOrderForm.controls['price'].value
      );
    } else if (temp != '') {
      this.manageOrderForm.controls['quantity'].setValue('1');
      this.manageOrderForm.controls['total'].setValue(
        this.manageOrderForm.controls['quantity'].value *
          this.manageOrderForm.controls['price'].value
      );
    }
  }

  validateProductAdd() {
    if (
      this.manageOrderForm.controls['total'].value ||
      this.manageOrderForm.controls['total'].value === null ||
      this.manageOrderForm.controls['quantity'].value <= 0
    ) {


      return true;
    } else {
      return false;
    }
  }

  validateSubmit() {
    if (
      this.totalAmount === 0 ||
      this.manageOrderForm.controls['name'].value === null ||
      this.manageOrderForm.controls['email'].value === null ||
      this.manageOrderForm.controls['contactNumber'].value === null ||
      this.manageOrderForm.controls['paymentMethod'].value === null
    ) {
      return true;
    } else {
      return false;
    }
  }

  add() {
    var formData = this.manageOrderForm.value;

    console.log(formData);

    var productName = this.dataSource.find(
      (e: { id: number }) => e.id === formData.product.Id
    );
    if (productName === undefined) {

      this.totalAmount = this.totalAmount + formData.total;

      this.dataSource.push({
        id: formData.product.id,
        name: formData.product.name,
        category: formData.category.name,
        quantity: formData.quantity,
        price: formData.price,
        total: formData.total,
      });

      this.dataSource = [...this.dataSource];
      this.SnackbarService.openSnackBar(
        GlobalConstants.productAdded,
        'success'
      );
    } else {
      this.SnackbarService.openSnackBar(
        GlobalConstants.productExistError,
        GlobalConstants.error
      );
    }
  }

  handleDeleteAction(value:any,element:any){
  this.totalAmount=this.totalAmount-element.total;
  this.dataSource.splice(value,1);
  this.dataSource=[...this.dataSource];
  }


  submitAction(){

    var formData= this.manageOrderForm.value;
    var data = {
    name: formData.name,
    email: formData.email,
    contactNumber: formData.contactNumber,
    paymentMethod: formData.paymentMethod, totalAmount: this.totalAmount.toString(),
    productDetails:JSON.stringify(this.dataSource)
    }
    console.log(data);

    this.ngxService.start();
    this.billServuce.generateReport(data).subscribe((Response:any)=>{
      this.SnackbarService.openSnackBar(
        GlobalConstants.submitSuccess,
        'success'
      );
      this.downloadFile(Response?.uuid);
      this.manageOrderForm.reset();
      this.dataSource=[];
      this.totalAmount=0;
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
    })
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
