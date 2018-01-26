import {Injectable,OnInit} from '@angular/core'
import {Router,CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot} from '@angular/router'
import {AuthService} from '../services/auth.service'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/do'
@Injectable()
export class AuthGuard implements CanActivate,OnInit {
 
    constructor(private authService : AuthService,private router : Router){
 
    }
    ngOnInit(){
     
    }
canActivate(route : ActivatedRouteSnapshot,state : RouterStateSnapshot){
  debugger;
   return this.authService.user.map(res=> (res && res.uid!=undefined)).do(
      loggedin=>{
        if(!loggedin){
          this.router.navigate(['login'],{queryParams : {returnUrl : state.url}});
        }
      }
    )
 }
}