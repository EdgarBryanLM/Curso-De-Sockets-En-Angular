import { Marcador } from './marcador';


export class Mapa{
private marcadores:{[key:string]:Marcador}={

    '1':{
        id:'1',
        nombre:'Fernando',
        lng:-75.75512993582937,
        lat:45.349977429009954,
        color:'#dd8fee'
      },
      '2':{
        id:'2',
        nombre:'Alex',
        lng:-75.75195645527508,
        lat:45.35158404583756,
        color:'#790af0'
      },
      '3':{
        id:'3',
        nombre:'Edgar',
        lng:-75.75900589557777,
        lat:45.34794635758547,
        color:'#19884b'
      }

};

/**
 *
 */
constructor() {}

getMarcadores(){

return this.marcadores;
}

Addmarcador(marcador:Marcador){

    this.marcadores[marcador.id]=marcador;
}


borraMarcador(id:string){
delete this.marcadores[id];
return this.getMarcadores();
}


MoverMarcador(marcador:Marcador){
    this.marcadores[marcador.id].lng=marcador.lng;
    this.marcadores[marcador.id].lat=marcador.lat;

}


}