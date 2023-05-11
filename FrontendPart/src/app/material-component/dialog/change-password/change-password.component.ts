import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { error } from 'console';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  oldPassword=true;
  newPassword=true;
  confirmPassword=true;
  changePasswordForm:any=FormGroup;
  responsemessage:any;

  constructor(
    private formbuilder:FormBuilder,
    private userService:UserService,
    private dialoRef:MatDialogRef<ChangePasswordComponent>,
    private ngxService:NgxUiLoaderService,
    private snackBar:SnackbarService
  ) {}

  ngOnInit(): void {
    this.changePasswordForm=this.formbuilder.group({

      oldPassword:[null,Validators.required],
      newPassword:[null,Validators.required],
      confirmPassword:[null,Validators.required]

    })
  }
  validateSubmit(){
    if(this.changePasswordForm.controls['newPassword'].value !=this.changePasswordForm.controls['confirmPassword'].value){
        return true;
    }else{
      return false;
    }
  }

  handlePasswordChangeSubmit(){
    this.ngxService.start();
    var formData=this.changePasswordForm.value;
    var data={
      oldPassword:formData.oldPassword,
      newPassword:formData.newPassword,
    }
    this.userService.chagePassWord(data).subscribe((response:any)=>{
      this.ngxService.stop();
      this.responsemessage=response?.message;
      this.dialoRef.close();
      this.snackBar.openSnackBar(this.responsemessage,"success");
    },error=>{
      console.log(error);
      this.ngxService.stop();
      if(error.error?.message){
           this.responsemessage=error.error?.message;
      }else{
        this.responsemessage=GlobalConstants.genricError;
      }
      this.snackBar.openSnackBar(this.responsemessage,GlobalConstants.error);
    })
  }

}
