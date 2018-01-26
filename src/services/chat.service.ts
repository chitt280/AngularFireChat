import {Injectable} from '@angular/core'
import {AngularFireDatabase,AngularFireList} from 'angularfire2/database'
import {AngularFireAuth} from 'angularfire2/auth'
import {Observable} from 'rxjs'
import {ChatMessage} from '../models/chatmessage'
import {User} from '../models/user'
import {AuthService} from '../services/auth.service'
@Injectable()
export class ChartService{
    userDetail : User;
    Chatmessages: AngularFireList<ChatMessage>;
    constructor(private db : AngularFireDatabase,private authService : AuthService){
       
    }
    getMessages (): AngularFireList<ChatMessage>{
        return this.db.list('chatmessages',ref=>ref.limitToLast(5).orderByKey());
    }
    sendMessage(msg : string){
        debugger;
        let datetime=this.getTimeStamp();
        this.Chatmessages=this.getMessages();
        this.authService.user.subscribe(user=>{
            this.db.object("users/"+user.uid).valueChanges().subscribe(
                returnUser=>{
                    this.userDetail=returnUser;
                    this.Chatmessages.push(
                        {
                        message :msg,
                        timeSent : datetime,
                        username : this.userDetail.displayName,
                        email : this.userDetail.email
                        }
                 );
                } 
            );
            
        })
        
    }
    getTimeStamp(){
        let now=new Date();
        return now.getUTCFullYear() + "/" + (now.getUTCMonth()+1)  + "/" + now.getUTCDay() +
        " " + now.getUTCHours()+":"+ now.getUTCMinutes() +":"+ now.getUTCSeconds();
    }
}