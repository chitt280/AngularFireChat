export class ChatMessage{
  $key ?: string;
  email ?:string;
  message ?:string;
  username ?:string;
  timeSent ?: Date =new Date();
}