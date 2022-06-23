import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { usuario } from '../classes/usuario';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketStatus=false;

  public Usuario!:any;
  constructor(private scokect:Socket,private router:Router) {
  this.CargarUsuario();
  this.checkStatus();
  
  }


  checkStatus(){
  this.scokect.on('connect',()=>{
  console.log('conectado');
  this.socketStatus=true;
  this.CargarUsuario();
  });

  this.scokect.on('disconnect',()=>{
    console.log('desconectado');
    this.socketStatus=false;
    });
  }


  emit(evento:string,payload?:any,callback?:any){
    // emit('evento',payload,callback)
    this.scokect.emit(evento,payload,callback);
  }

  listen(evento:string){
    return this.scokect.fromEvent(evento);
  }


  loginWS(nombre:string){
  return new Promise((resolve,reject)=>{
    this.emit('configurar-usuario',{nombre},(resp:any)=>{

      this.Usuario=new usuario(nombre);
      this.GuardarUsuario();
        resolve(resp);
        
    
    });
  });
  }


  GuardarUsuario(){
  localStorage.setItem('usuario',JSON.stringify(this.Usuario));
  }

  CargarUsuario(){
  if(localStorage.getItem('usuario')){

    this.Usuario=JSON.parse(localStorage.getItem('usuario')!);
    this.loginWS(this.Usuario.nombre);
  }
  }

  getUsuario(){
  return this.Usuario;
  }

  logoutWS(){
    this.Usuario=null;
    localStorage.removeItem('usuario');
    const payload={
    nombre: 'sin nombre'
    };

    this.emit('configurar-usuario',payload,()=>{});
    this.router.navigateByUrl('');
  }

}
