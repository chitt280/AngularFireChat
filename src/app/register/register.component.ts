import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private displayname : string;
  private password : string;
  private email : string;
  constructor(private authService : AuthService) { }

  ngOnInit() {
  }
  register(){
    if(this.displayname!="" && this.email !="" && this.password !=""){
      this.authService.registerUser(this.email,this.password,this.displayname);
    }
  }
}
