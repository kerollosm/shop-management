import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  implements OnInit{
  name!:any
  show:boolean=false
  constructor(private router:Router,private authService:AuthService){
    
    if(this.authService.isLogedin()){
      this.show=true
    }
    else{
      this.show=false
    }
  }
 
  
logout(){
  sessionStorage.clear()
  this.router.navigate(['login'])
  location.replace('')
}
ngOnInit(): void { 
    this.name=sessionStorage.getItem('userName')?.toString().toUpperCase()

  
}
}
