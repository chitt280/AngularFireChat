import {Injectable} from '@angular/core'
import {AngularFireDatabase,AngularFireList} from 'angularfire2/database'
import {AngularFireAuth} from 'angularfire2/auth'
import {Observable} from 'rxjs'
import * as Firebase from 'firebase'
import {ChatMessage} from '../models/chatmessage'
import { retry } from 'rxjs/operators/retry';
@Injectable()
export class ChartService{
    Chatmessages: AngularFireList<ChatMessage>;
    constructor(private db : AngularFireDatabase){
       
    }
    getMessages (): AngularFireList<ChatMessage>{
        return this.db.list('chatmessages',ref=>ref.limitToLast(5).orderByKey());
    }
    sendMessage(msg : string){
        let datetime=this.getTimeStamp();
        this.Chatmessages=this.getMessages();
        this.Chatmessages.push(
               {
               message :msg,
               timeSent : datetime,
               username : 'testuser',
               email : 'testemail@gmail.com'
               }
        );
    }
    getTimeStamp(){
        let now=new Date();
        return now.getUTCFullYear() + "/" + (now.getUTCMonth()+1)  + "/" + now.getUTCDay() +
        " " + now.getUTCHours()+":"+ now.getUTCMinutes() +":"+ now.getUTCSeconds();
    }
}