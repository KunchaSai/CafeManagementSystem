import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BillService {


  url=environment.apiUrl;
  constructor(private http:HttpClient) { }

  generateReport(data:any){
    return this.http.post(this.url+"/bill/generateReport",data,{
      headers:new HttpHeaders().set('Content-Type',"application/json")
    })
  }

  getPdf(data:any):Observable<Blob>{
      return this.http.post(this.url+"/bill/getPdf",data,{responseType:'blob'});
  }
  getBill(){
    return this.http.get(this.url+"/bill/getbills");
}

delete(id:any){
  console.log(id);
  return this.http.post(this.url+"/bill/delete/"+id,{
    headers:new HttpHeaders().set('Content-Type',"application/json")
  })
}



}
