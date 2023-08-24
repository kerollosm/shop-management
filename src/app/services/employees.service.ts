import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  apiUrl: string = 'http://localhost:3000/employees'

  constructor(private http:HttpClient) { }
  getAll():Observable<any>{
    return this.http.get(this.apiUrl)
   }
   addEmployee(data:any):Observable<any>{
    return this.http.post(this.apiUrl,data)
  }
  updateEmployee(id:any,data:any){
    return this.http.put(`${this.apiUrl}/${id}`,data)
  }
  deleteEmployee(id:any):Observable<any>{
    return this.http.delete(`${this.apiUrl}/${id}`)
  }
}
