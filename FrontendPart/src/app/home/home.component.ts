import { LoginComponent } from './../login/login.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SignupComponent } from '../signup/signup.component';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { error } from 'console';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private dialog:MatDialog,
              private service:UserService,
              private router:Router) { }

  ngOnInit(): void {

    this.service.checkToken().subscribe((response:any)=>{
      console.log(response);

      this.router.navigate(['/cafe/dashboard']);
    },(error:any)=>{
      console.log(error);
    })
  }

  handleSignUpAction()
  {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width="550px";
    this.dialog.open(SignupComponent,dialogConfig);
  }

  handleLoginAction()
  {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width="550px";
    this.dialog.open(LoginComponent,dialogConfig);
  }

  navigateCustomer()
  {
    this.router.navigateByUrl("/exploremore")
  }



}
