import { Component, OnInit, EventEmitter, inject, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {

  onEmitStatusChage=new EventEmitter();
  deatils:any={};
  constructor(@Inject(MAT_DIALOG_DATA)public dialogData:any) { }

  ngOnInit(): void {
    if(this.dialogData && this.dialogData.confirmation){
      this.deatils=this.dialogData;
    }
  }

  handleChangeAction(){
    this.onEmitStatusChage.emit();
  }

}
