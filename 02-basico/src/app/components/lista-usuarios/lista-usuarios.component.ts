import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatServicesService } from 'src/app/services/chat-services.service';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {

  usuariosActivosOB!:Observable<any>; 
  
  constructor(public chat:ChatServicesService) { }

  ngOnInit(): void {
    this.usuariosActivosOB=this.chat.GetUsuariosActivos();

    this.chat.EmitirUsuariosActivos();
  }

}
