import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot,CanActivate, CanActivateFn, Router, RouterStateSnapshot,UrlTree } from "@angular/router";
import { Observable } from 'rxjs';
import { AuthService } from "../services/auth.service";
import { ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn:'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService:AuthService,private router:Router,toastr:ToastrService){}

  canActivate(
    route: ActivatedRouteSnapshot,
     state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(this.authService.isLogedin()){
      return true;
    } else {
      this.router.navigate(['login']);
      return false
    }
  }
}
