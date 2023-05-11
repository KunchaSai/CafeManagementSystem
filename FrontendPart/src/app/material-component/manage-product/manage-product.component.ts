import { SnackbarService } from 'src/app/services/snackbar.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { ProductComponent } from '../dialog/product/product.component';
import { ConfirmationComponent } from '../dialog/confirmation/confirmation.component';
import { error } from 'console';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.scss'],
})
export class ManageProductComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'categoryName',
    'image',
    'description',
    'price',
    'edit',
  ];
  dataSource: any;
  length1: any;
  responseMessage: any;

  constructor(
    private ngxService: NgxUiLoaderService,
    private productService: ProductService,
    private dialog: MatDialog,
    private SnackbarService: SnackbarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.ngxService.start();
    this.tableData();
  }

  tableData() {
    this.productService.getProduct().subscribe(
      (response: any) => {
        this.ngxService.stop();
        this.dataSource = new MatTableDataSource(response);
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);

    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // Add Category

  handleAddActions() {

    const dialogConfig=new MatDialogConfig();
    dialogConfig.data={
      action:'Add',

    }
    dialogConfig.width="850px";
    const dialogRef=this.dialog.open(ProductComponent,dialogConfig);
    this.router.events.subscribe(()=>{
        dialogRef.close();
    })
    const sub=dialogRef.componentInstance.onAddProduct.subscribe((response:any)=>{
      this.tableData();
  })

  }


  handleEditAction(values:any){
    const dialogConfig=new MatDialogConfig();
    dialogConfig.data={
      action:'Edit',
      data:values
    }
    dialogConfig.width="850px";
    const dialogRef=this.dialog.open(ProductComponent,dialogConfig);
    this.router.events.subscribe(()=>{dialogRef.close();})
    const sub=dialogRef.componentInstance.onEditProduct.subscribe(response=>{
      this.tableData();
    })
  }


  handleDeleteAction(values:any){

    const dialogConfig=new MatDialogConfig();
    dialogConfig.data={
      message:'delete '+values.name+' product',
      confirmation:true
    }
    const dialogRef=this.dialog.open(ConfirmationComponent,dialogConfig);
    const sub=dialogRef.componentInstance.onEmitStatusChage.subscribe((response:any)=>{
      this.ngxService.start();
      this.deleteProduct(values.id);
      dialogRef.close();
  })

  }

  deleteProduct(id:any){
  this.productService.delete(id).subscribe((response:any)=>{
    this.ngxService.stop();
    this.tableData();
    this.responseMessage=response?.message;
    this.SnackbarService.openSnackBar(this.responseMessage,"success")
  },(error:any)=>{
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
  })
  }

  onChange(status:any,id:any){
   this.ngxService.start();
   console.log(status.toString());

   var data={
    status:status.toString(),
    id:id
   }
   this.productService.updateStatus(data).subscribe((response:any)=>{
    this.ngxService.stop();
    this.responseMessage=response?.message;
    this.SnackbarService.openSnackBar(this.responseMessage,"success")
  },(error:any)=>{
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
  })
  }
}
