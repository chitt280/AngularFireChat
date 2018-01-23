import { Component, OnInit,Input} from '@angular/core';
import { ChatMessage } from '../../models/chatmessage';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  @Input()
  chatMessage : ChatMessage;
  constructor() { }

  ngOnInit() {
  }

}
