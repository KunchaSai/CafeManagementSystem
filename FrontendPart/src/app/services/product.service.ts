import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../customer/model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url=environment.apiUrl;//url
  constructor(private http:HttpClient) { }

  add(data:any){
    return this.http.post(this.url+"/product/add",data,{
      headers:new HttpHeaders().set('Content-Type',"application/json")
    })
  }

  update(data:any){
    console.log(data);
    return this.http.post(this.url+"/product/update",data,{
      headers:new HttpHeaders().set('Content-Type',"application/json")
    })
  }

  getProduct(){
    return this.http.get(this.url+"/product/get",{
      headers:new HttpHeaders().set('Content-Type',"application/json")
    })
  }

  updateStatus(data:any){
    console.log(data);
    return this.http.post(this.url+"/product/updatestat",data,{
      headers:new HttpHeaders().set('Content-Type',"application/json")
    })
  }

  delete(id:any){
    console.log(id);
    return this.http.post(this.url+"/product/delete/"+id,{
      headers:new HttpHeaders().set('Content-Type',"application/json")
    })
  }


  getProductByCategory(id:any){
    return this.http.get(this.url+"/product/getByCategory/"+id);
  }
  getById(id:any){
      return this.http.get(this.url+"/product/getById/"+id);
  }



}
