import {Injectable} from '@angular/core'
import {AngularFireDatabase,AngularFireList} from 'angularfire2/database'
import {AngularFireAuth} from 'angularfire2/auth'
import {Router} from '@angular/router'
import {Observable} from 'rxjs'
import * as Firebase from 'firebase'
import {User} from '../models/user'

@Injectable()
export class AuthService{
    private authState : any;
 constructor(private afAuth : AngularFireAuth,private db : AngularFireDatabase,private router :Router){
     this.authState=afAuth.authState;
 }
 get CurrentUserId() : string {
     return this.authState !=null ? this.authState.uid : "";
 }
 loginUser(email : string,password : string){
     this.afAuth.auth.signInWithEmailAndPassword(email,password).then(
         (res)=>{
            let status='online';
            this.setUserStatus(status);
            this.router.navigate(['chat']);
         }
     ).catch((error)=>{console.log(error)});
 }
 registerUser(email : string,password : string,display : string){
     this.afAuth.auth.createUserWithEmailAndPassword(email,password).then((res)=>{
    this.authState=res;
     let status='online';
     this.saveUserInDatabase(email,display,status);
     this.router.navigate(['chat']);
     }).catch(
        (error)=>{console.log(error)});
 }
 saveUserInDatabase(email :string,display : string,status : string){
    let path="users/"+this.CurrentUserId;
    console.log(path);
     let data={
         email : email,
         display : display,
         status : status
     }
    this.db.object(path).update(data).then((res)=>{
        console.log(res);
    }

    ).catch((error)=>{
      console.log(error);
    });
 }
 setUserStatus(status : string){
    let path="users/"+this.CurrentUserId;
    let data={
        status : status
    }
    this.db.object(path).update(data).catch((error)=>{
        console.log(error);
      });
 }
}