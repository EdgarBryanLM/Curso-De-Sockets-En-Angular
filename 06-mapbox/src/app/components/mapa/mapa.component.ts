import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl'; 
import { WebsocketService } from 'src/app/services/websocket.service';
export interface Lugar{
  id:string,
  nombre:string,
  lng:number,
  lat:number,
  color:string
}

interface RespMarcador{
  [key:string]:Lugar
}
@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {
  Lugares:{[key:string]:Lugar}={};
  constructor(private wsService:WebsocketService) { }
  map:any;

  markert:{[id:string]:mapboxgl.Marker}={};

  ngOnInit(): void {
    this.crearMapa();
    this.escucharSckets();
  }

  escucharSckets(){
  //marcador-nuevo
this.wsService.listen('marcador-nuevo').subscribe((res:any)=>{
this.AddMarcador(res);
});
  //marcador-mover
this.wsService.listen('mover-marcador').subscribe((res:any)=>{

  this.markert[res.id].setLngLat([res.lng,res.lat]);

});
  //marcador-borrar
  this.wsService.listen('marcador-borrar').subscribe((id:any)=>{
    this.markert[id].remove();
    delete this.markert[id];
  });
  }


  crearMapa(){
     this.map = new mapboxgl.Map({
      accessToken: 'pk.eyJ1IjoiZWRnYXJzc2ozIiwiYSI6ImNrcjQwYnp4ajJyNDUycHJ1emptMnY4MGUifQ.SBrictScSrvus86l8JFgQw',
      container: 'mapa', // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: [-75.75512993582937, 45.349977429009954], // starting position [lng, lat]
      zoom: 15.8 // starting zoom
    });


  }


  AddMarcador(marcador:Lugar){
    console.log(marcador);

    const h2= document.createElement('h2');
    h2.innerText=marcador.nombre;

    const btnBorrar=document.createElement('button');
    btnBorrar.innerText="Borrar";

    const div =document.createElement('div');
    div.append(h2,btnBorrar);
   
    const custom=new mapboxgl.Popup({
    offset:25,
    closeOnClick:false
    }).setDOMContent(div);
    const market= new mapboxgl.Marker({
    draggable:true,
    color:marcador.color,
    
    }).setLngLat([marcador.lng,marcador.lat])
    .setPopup(custom)
    .addTo(this.map);

    market.on('drag',()=>{
    const lngLat= market.getLngLat();
    const nuevo={
    id:marcador.id,
    lng:lngLat.lng,
    lat:lngLat.lat
    }
    this.wsService.emit('mover-marcador',nuevo);
    });

    btnBorrar.addEventListener('click',()=>{
    market.remove();
    this.wsService.emit('marcador-borrar',marcador.id);
    });

    this.markert[marcador.id]=market;
  }




  crearMarcador(){
    const customMarker:Lugar={
      id: new Date().toISOString(),
      lng:-75.75512993582937,
      lat:45.349977429009954,
      nombre:'Sin Nombre',
      color: '#'+ Math.floor(Math.random()*16777215).toString(16)
    }
  
    this.AddMarcador(customMarker);

    this.wsService.emit('marcador-nuevo',customMarker);
 
  }

}
