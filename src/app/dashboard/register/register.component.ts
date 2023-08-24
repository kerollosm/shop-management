import { Component } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms'
import { Router } from '@angular/router';
import {ToastrService} from 'ngx-toastr' 
import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private builder:FormBuilder,private toastr:ToastrService,
    private authService:AuthService,private router:Router){}

  registerForm=this.builder.group({
    id:this.builder.control('',Validators.compose([Validators.required,Validators.minLength(4)])),
    password:this.builder.control('',Validators.compose([Validators.required,Validators.pattern('(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[$@$!%*?&]).{8,}$')])),
    role:this.builder.control(''),
  })

  proceedregisteration(){
    if(this.registerForm.valid){
      this.authService.proceedRegister(this.registerForm.value).subscribe(res => {
        this.toastr.success("تم التسجيل")
        this.router.navigate(['login'])
      })
    }else{
    this.toastr.warning('البيانات غير صحيحة')
  }

  }
}
