import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service'
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
private IsLoogedIn : boolean; 
  constructor(private authService : AuthService) { 
    this.authService.user.subscribe(
      res=>{
        if(res && res.uid!=undefined){
          this.IsLoogedIn=true;
        }else{
          this.IsLoogedIn=false;
        }
      }
    )
  }

  ngOnInit() {
    
  }
  logout(){
    this.authService.logout();
  }
 
}
