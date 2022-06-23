import { Component, OnInit } from '@angular/core';
import { ChatServicesService } from './services/chat-services.service';
import { WebsocketService } from './services/websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'basico';

  /**
   *
   */
  constructor(public wsServer:WebsocketService,public chat:ChatServicesService) {
    this.chat.GerMessagesPriv().subscribe(resp=>{
        console.log(resp);
    });

    
  }

  ngOnInit(): void {
    
  }

  
}
