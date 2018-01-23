import { Component, OnInit } from '@angular/core';
import {ChartService} from '../../services/chat.service'
@Component({
  selector: 'app-sendmessage',
  templateUrl: './sendmessage.component.html',
  styleUrls: ['./sendmessage.component.css']
})
export class SendmessageComponent implements OnInit {
message : string;
  constructor(private chartService : ChartService) { }

  ngOnInit() {
  }
  SendMessage(){
    if(this.message!=""){
      this.chartService.sendMessage(this.message);
      this.message="";
    }
    
  }
  SendMessageOnEnter(event){
    if(event.keyCode===13){
      this.SendMessage();
    }
  }
}
