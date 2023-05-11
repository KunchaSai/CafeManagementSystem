import { Component, AfterViewInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from '../services/snackbar.service';
import { error } from 'console';
import { GlobalConstants } from '../shared/global-constants';
@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {

  responseMessage:any;
  data:any;

	ngAfterViewInit() { }

	constructor(private dashBoardservice:DashboardService,
               private ngxService:NgxUiLoaderService,
               private snackBarService:SnackbarService) {
                this.ngxService.start();
                this.dashboarddata();
	}

   dashboarddata(){
    this.dashBoardservice.getDetails().subscribe((response:any)=>{
        this.ngxService.stop();
        this.data=response;
        console.log(this.data);
    },(error:any)=>{
      this.ngxService.stop();
      console.log(error);
      if(error.error?.message){
        this.responseMessage=error.error?.message;
      }else{
        this.responseMessage=GlobalConstants.genricError;
      }
      this.snackBarService.openSnackBar(this.responseMessage,GlobalConstants.error);
    })
   }
}
