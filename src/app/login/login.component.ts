import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private password : string;
  private email : string;
  constructor(private authService : AuthService) { }

  ngOnInit() {
    this.authService.logout();
  }
 login(){
   this.authService.loginUser(this.email,this.password);
 }
}
