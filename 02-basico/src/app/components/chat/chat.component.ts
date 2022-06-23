import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatServicesService } from 'src/app/services/chat-services.service';
import { WebsocketService } from 'src/app/services/websocket.service';
interface menss{
  de:string,
  cuerpo:string
}
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit,OnDestroy {
  texto:string='';
  MensajesSuscripcion!:Subscription;
  mensajes:menss []=[];
  elemento!:HTMLElement;
  constructor(private wsServices:WebsocketService,public chat:ChatServicesService) { }


  ngOnInit(): void {
    this.elemento = <HTMLInputElement>document.getElementById('chat-mensajes');
   this.MensajesSuscripcion= this.chat.getMessage().subscribe({
    next: (resp:any)=>{
      console.log(resp);
      this.mensajes.push(resp);

      setTimeout(()=>{
      this.elemento.scrollTop=this.elemento.scrollHeight;
      },50)
      
    },
    complete:()=>{
    console.log('completado');
    
    }
  });
  }


  ngOnDestroy(): void {
    this.MensajesSuscripcion.unsubscribe();
  }

  enviar(){
  
  console.log(this.texto);
  this.chat.SendMessage(this.texto);
  this.texto='';
  
  }
}
