import {Injectable} from '@angular/core'
import {AngularFireDatabase,AngularFireList} from 'angularfire2/database'
import {AngularFireAuth} from 'angularfire2/auth'
import {Router,ActivatedRoute} from '@angular/router'
import {Observable} from 'rxjs'
import * as Firebase from 'firebase'
import {User} from '../models/user'

@Injectable()
export class AuthService{
    public user : Observable<Firebase.User>;
    private returnUrl : string;
 constructor(private afAuth : AngularFireAuth,private db : AngularFireDatabase,private router :Router,private activatedRoute : ActivatedRoute){
     debugger;
     this.user=this.afAuth.authState;
     this.returnUrl= this.activatedRoute.snapshot.queryParams["returnUrl"] || '/';
 }

 loginUser(email : string,password : string){
     this.afAuth.auth.signInWithEmailAndPassword(email,password).then(
         (res)=>{
            let status='online';
            this.setUserStatus(status);
            this.router.navigate([this.returnUrl]);
         }
     ).catch((error)=>{console.log(error)});
 }
 logout(){
    let status='offline';
    this.setUserStatus(status);
     this.afAuth.auth.signOut().then(
         (res)=>{
           
            this.router.navigate(["login"]);
         }
     );
 }
 registerUser(email : string,password : string,display : string){
     this.afAuth.auth.createUserWithEmailAndPassword(email,password).then((res)=>{
         debugger;
     this.user=this.afAuth.authState;
     let status='online';
     this.saveUserInDatabase(email,display,status);
     this.router.navigate([this.returnUrl]);
     }).catch(
        (error)=>{console.log(error)});
 }
 saveUserInDatabase(email :string,display : string,status : string){
     this.user.subscribe(res=>{
         debugger;
         if(res && res.uid!=undefined){
            let path="users/"+res.uid;
            console.log(path);
             let data={
                 email : email,
                 displayName : display,
                 status : status
             }
            this.db.object(path).update(data).then((res)=>{
                console.log(res);
            }
        
            ).catch((error)=>{
              console.log(error);
            });
         }
     })
   
 }
 setUserStatus(status : string){
    this.user.subscribe(res=>{
        if(res && res.uid!=undefined){
    let path="users/"+res.uid;
    let data={
        status : status
    }
    this.db.object(path).update(data).catch((error)=>{
        console.log(error);
      });
    }
});
 }
}