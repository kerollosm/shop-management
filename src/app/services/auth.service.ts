import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }
  apiurl='http://localhost:3000/user';
  GetAll(){
    return this.http.get(this.apiurl)
  }
  GetByCode(code:any){
    return this.http.get(this.apiurl+'/'+code)
  }
  proceedRegister(inputData:any){
    return this.http.post(this.apiurl,inputData)
  }
  updateUser(code:any,inputData:any){
    return this.http.post(this.apiurl+'/'+code,inputData)
  }
  isLogedin(){
    return sessionStorage.getItem('userName')!=null
  }
  getUserRole(){
    return sessionStorage.getItem('userRole')!=null?sessionStorage.getItem('userRole')?.toString():''
  }
}

