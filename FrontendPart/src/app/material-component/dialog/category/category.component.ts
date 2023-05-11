import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { error } from 'console';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CategoryService } from 'src/app/services/category.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  onAddCategory=new EventEmitter();
  onEditCategory=new EventEmitter();
  categoryForm:any=FormGroup;
  dialogAction:any='Add';
  action:any='Add';
  responseMessage:any;

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData:any,
  private formBuilder:FormBuilder,
    private router:Router,
    private categoryservice :CategoryService,
    private snackbarService:SnackbarService,
    private ngxService:NgxUiLoaderService,
    public dialogRef:MatDialogRef<CategoryComponent>) {}

    ngOnInit(): void {

      this.categoryForm= this.formBuilder.group({ name: [null,[Validators.required, Validators.pattern(GlobalConstants.nameRegex)]]});

      if(this.dialogData.action === 'Edit'){ //ADD //

      this.dialogAction = "Edit";

      this.action = "Update";

      this.categoryForm.patchValue(this.dialogData.data);

      }

    }

    handleSubmit()
    {
      if(this.dialogAction==="Edit"){ //eDIT===Edit
        this.edit();
      }
      else
      {
        this.add();
      }
    }

    add(){
      var formData= this.categoryForm.value;
      var data = {
        name:formData.name
      }

      this.categoryservice.add(data).subscribe((response:any)=>{
        this.dialogRef.close();
        this.onAddCategory.emit();
        this.responseMessage=response.message;
        this.snackbarService.openSnackBar(this.responseMessage,"Success")

      },(error)=>{
        this.dialogRef.close();
        console.log(error.error?.message);
        if(error.error?.message)
        {
          this.responseMessage = error.error?.message;
        }
        else
        {
          this.responseMessage = GlobalConstants.genricError;
        }
        this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error)
      })
    }
    edit(){
      var formData= this.categoryForm.value;
      var data = {
        id:this.dialogData.data.id,
        name:formData.name
      }

      this.categoryservice.update(data).subscribe((response:any)=>{
        this.dialogRef.close();
        this.onAddCategory.emit();
        this.responseMessage=response.message;
        this.snackbarService.openSnackBar(this.responseMessage,"Success")

      },(error)=>{
        this.dialogRef.close();
        console.log(error.error?.message);
        if(error.error?.message)
        {
          this.responseMessage = error.error?.message;
        }
        else
        {
          this.responseMessage = GlobalConstants.genricError;
        }
        this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error)
      })
    }



}
