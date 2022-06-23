import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of } from 'rxjs';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class GraficasService {

  constructor(public http:HttpClient,public webservice:WebsocketService) { }

  getData(){
  return this.http.get('http://localhost:5000/encuesta',{headers: new HttpHeaders(
  {
    'Content-Type': 'application/json',
        })}).pipe(
                   
          catchError( err => of(false) )
          );
  }


  escuchar(){
  this.webservice.listen('cambio-encuesta').subscribe((data:any)=>{
  
  });
  }
}
