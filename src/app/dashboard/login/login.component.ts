import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userData!: any
  constructor(private builder: FormBuilder, private toastr: ToastrService,
    private authService: AuthService, private router: Router) { }

  loginForm = this.builder.group({
    userName: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.compose([Validators.required, Validators.pattern('(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[$@$!%*?&]).{8,}$')]))
  })

  proceedLogin() {
    if (this.loginForm.valid) {
      this.authService.GetByCode(this.loginForm.value.userName).subscribe(
        (res) => {
        this.userData = res
        console.log(this.userData)
        if (this.userData.password === this.loginForm.value.password) {
          sessionStorage.setItem('userName', this.userData.id)
          sessionStorage.setItem('userRole', this.userData.role)
          this.router.navigate([''])
          location.replace('')
          this.toastr.success('تم تسجيل الدخول')
        } else {
          this.toastr.error('كلمة السر غير صحيحة')
        }
      },
      (err)=>{
this.toastr.error('اسم المستخدم غير صحيح')
console.log(err)
      }
      )
    }else{
      this.toastr.warning('البيانات غير كامله')
    }
  }
}
