import { Injectable } from "@angular/core"
export interface Menu
{
  state:string,
  name:string,
  type:string,
  icon:string,
  role:string
}

const MENUITEMS=[
  {state:'dashboard',name:'Dashboard',type:'link',icon:'dashboard',role:''},
  {state:'category',name:'Manage category',type:'link',icon:'category',role:'admin'},
  {state:'product',name:'Manage product',type:'link',icon:'inventory_2',role:'admin'},
  {state:'order',name:'Order',type:'link',icon:'shopping_cart',role:''},
  {state:'bill',name:'View bill',type:'link',icon:'backup_table',role:''},
]

@Injectable()
export class MenuItems{

  getMenuItems():Menu[]{
    return MENUITEMS;
  }
}
