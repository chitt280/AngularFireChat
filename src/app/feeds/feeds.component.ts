import { Component, OnInit,OnChanges } from '@angular/core';
import {ChartService} from '../../services/chat.service'
@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.css']
})
export class FeedsComponent implements OnInit,OnChanges {
  feed :any;
  constructor(private chartService :ChartService) { }

  ngOnInit() {
    this.feed=this.chartService.getMessages().valueChanges();
    console.log( this.feed);
  }
  ngOnChanges(){
    this.feed=this.chartService.getMessages().valueChanges();
  }

}
