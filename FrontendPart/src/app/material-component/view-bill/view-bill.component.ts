import { SnackbarService } from './../../services/snackbar.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { error } from 'console';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { BillService } from 'src/app/services/bill.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { ViewBillProductsComponent } from '../dialog/view-bill-products/view-bill-products.component';
import { ConfirmationComponent } from '../dialog/confirmation/confirmation.component';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-view-bill',
  templateUrl: './view-bill.component.html',
  styleUrls: ['./view-bill.component.scss']
})
export class ViewBillComponent implements OnInit {

  displayColumns:string[]=['name','date','time','contactNumber','total','view'];
  dataSource:any;
  responsemessage:any;

  constructor(private billService:BillService,
              private router:Router,
              private ngxService:NgxUiLoaderService,
              private dialog:MatDialog,
              private SnackbarService:SnackbarService
              ) { }

  ngOnInit(): void {
    this.ngxService.start();
    this.tableData();
  }
  tableData(){
    this.billService.getBill().subscribe((response:any)=>{
      this.ngxService.stop();
      this.dataSource=new MatTableDataSource(response);


    },(error:any)=>{
      this.ngxService.stop();
      console.log(error);
      if(error.error?.message){
        this.responsemessage=error.error?.message;
      }else{
        this.responsemessage=GlobalConstants.genricError;
      }
      this.SnackbarService.openSnackBar(this.responsemessage,GlobalConstants.error);
    })
  }

  applyfilter(event:Event){
    const filterValue=(event.target as HTMLInputElement ).value;
    this.dataSource.filter=filterValue.trim().toLowerCase();
  }

  handleViewAction(values:any){
    const dialogConfig=new MatDialogConfig();
    dialogConfig.data={
      data:values
    }
    dialogConfig.width="100%";
    const dialogRef=this.dialog.open(ViewBillProductsComponent,dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    })
  }

//handling delete action
  handleDeleteAction(values:any){
    const dialogConfig=new MatDialogConfig();
    dialogConfig.data={
      message:'delete'+values.name+'bill',
      confirmation:true
    }

    const dialogRef=this.dialog.open(ConfirmationComponent,dialogConfig);
    const sub=dialogRef.componentInstance.onEmitStatusChage.subscribe((response:any)=>{
      this.ngxService.start();
      this.deleteBill(values.id);
      dialogRef.close();
    })




  }
  deleteBill(id:any){
    this.billService.delete(id).subscribe((response:any)=>{
      this.ngxService.stop();
      this.tableData();
      this.responsemessage=response?.message;
      this.SnackbarService.openSnackBar(this.responsemessage,"success");

    },(error:any)=>{
      this.ngxService.stop();
      console.log(error);
      if(error.error?.message){
        this.responsemessage=error.error?.message;
      }else{
        this.responsemessage=GlobalConstants.genricError;
      }
      this.SnackbarService.openSnackBar(this.responsemessage,GlobalConstants.error);
    })

  }
  downloadReportAction(values:any){
    this.ngxService.start();
    var data={
      name:values.name,
      email:values.email,
      uuid:values.uuid,
      contactNumber:values.contactNumber,
      paymentMethod:values.paymentMethod,
      totalamount:values.total.toString(),
      productDetails:values.productDetails

    }
    this.downloadFile(values.uuid,data);

  }


  downloadFile(fileName:string,data:any){
      this.billService.getPdf(data).subscribe(response=>{
        saveAs(response,fileName+' .pdf');
        this.ngxService.stop();
      })
  }
}
