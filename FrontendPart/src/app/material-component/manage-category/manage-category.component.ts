import { filter } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { error, log } from 'console';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CategoryService } from 'src/app/services/category.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { CategoryComponent } from '../dialog/category/category.component';

@Component({
  selector: 'app-manage-category',
  templateUrl: './manage-category.component.html',
  styleUrls: ['./manage-category.component.scss']
})
export class ManageCategoryComponent implements OnInit {

  displayedColumns:string[]=['name','edit'];
  dataSource:any;
  responsemessage:any;
  constructor(private formBuilder:FormBuilder,
    private router:Router,
    private categoryservice :CategoryService,
    private snackbarService:SnackbarService,
    public dialog:MatDialog,
    private ngxService:NgxUiLoaderService ) { }

  ngOnInit(): void {
    this.ngxService.start();
    this.tableData()
  }

  tableData(){
    this.categoryservice.getCategory().subscribe((response:any)=>{
        this.ngxService.stop();
        this.dataSource = new MatTableDataSource(response);

    },(error:any)=>{
        this.ngxService.stop();
        console.log(error.error?.message);
        if(error.error?.message){

             this.responsemessage=error.error?.message;

        }else{
          this.responsemessage=GlobalConstants.genricError;
        }
       this.snackbarService.openSnackBar(this.responsemessage,GlobalConstants.error);
    });

  }

  applyFilter(event:Event){
   const filterValue=(event.target as HTMLInputElement).value;
   console.log(filterValue);

   this.dataSource.filter=filterValue.trim().toLowerCase();
  }


  // Add Category
  handleAddActions(){
    const dialogConfig=new MatDialogConfig();
    dialogConfig.data={
      action:'Add'
    }

    dialogConfig.width="850px";
    const dialogRef=this.dialog.open(CategoryComponent,dialogConfig);
    this.router.events.subscribe(()=>{
        dialogRef.close();
    })
    const sub=dialogRef.componentInstance.onAddCategory.subscribe(response=>{
      this.tableData();
    })
  }

  handleEditAction(value:any){
    const dialogConfig=new MatDialogConfig();
    dialogConfig.data={
      action:'Edit',
      data:value
    }
    dialogConfig.width="850px";
    const dialogRef=this.dialog.open(CategoryComponent,dialogConfig);
    this.router.events.subscribe(()=>{
        dialogRef.close();
    })
    const sub=dialogRef.componentInstance.onAddCategory.subscribe(response=>{
      this.tableData();
    })
  }
}

