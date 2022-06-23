import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class ChatServicesService {

  constructor(public wsService:WebsocketService) { }

  SendMessage(mensaje:string){
  const payload={
      de:this.wsService.getUsuario().nombre,
      cuerpo:mensaje
  };

  this.wsService.emit('mensaje',payload);
  }


  getMessage(){
  return this.wsService.listen('mensaje-nuevo');
  }

  GerMessagesPriv(){
  return this.wsService.listen('mensaje-privado');
  }


  GetUsuariosActivos(){
    return this.wsService.listen('usuarios-activos');
  }


  EmitirUsuariosActivos(){
    return this.wsService.emit('obtener-usuarios');
  }

}
