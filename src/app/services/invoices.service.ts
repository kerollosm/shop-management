import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs'; 
import {  map } from 'rxjs/operators'; 

interface ApiResponse {
  total: number;
  details: {
    name: string;
    price: number;
    id: number;
    quantity: number;
    totalPrice: number;
  }[];
  creator: string;
  timeCreated: string;
  id: number;
}

@Injectable({
  providedIn: 'root'
})
export class InvoicesService {

  apiUrl:string='http://localhost:3000/invoices'
  constructor(private http:HttpClient) { }
  getAll():any{
   return this.http.get(this.apiUrl)
  }
  addInvoice(data:any):Observable<any>{
    return this.http.post(this.apiUrl,data)
  }
  updateInvoice(id:any,data:any){
    return this.http.put(`${this.apiUrl}/${id}`,data)
  }
  getInvHeaderByCode(id:any):Observable<any>{
    return this.http.get<ApiResponse>(`${this.apiUrl}/${id}`).pipe(
      map(data => data.details)
    );

  }
  getInvDetailByCode(id:any){
    return this.http.get(`${this.apiUrl}/${id}`)

  }
  deleteItem(id:any):Observable<any>{
    return this.http.delete(`${this.apiUrl}/${id}`)
  }
  // invoices:any[]=this.getAll()
  // filterInvoicesByDateRange(start: Date | null, end: Date | null): Observable<any[]> {
  //   if (!start || !end) {
  //     return of(this.invoices);
  //   }
  
  //   const filteredInvoices =this.invoices.filter((invoice: any) => {
  //     const invoiceDate = invoice.timeCreated;
  //     return invoiceDate >= start && invoiceDate <= end;
  //   });
  
  //   return of(filteredInvoices);
  // }

  
}
