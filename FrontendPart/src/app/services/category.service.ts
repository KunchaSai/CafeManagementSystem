import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  url=environment.apiUrl;
  constructor(private http:HttpClient) { }

  add(data:any){
    return this.http.post(this.url+"/category/add",data,{
      headers:new HttpHeaders().set('Content-Type',"application/json")
    })
  }

  update(data:any){
    return this.http.post(this.url+"/category/update",data,{
      headers:new HttpHeaders().set('Content-Type',"application/json")
    })
  }

  getCategory(){
    return this.http.get(this.url+"/category/get",{
      headers:new HttpHeaders().set('Content-Type',"application/json")
    })
  }

  getFilteredCategory(){
    return this.http.get(this.url+"/category/get?filterValue=true");
  }
}
