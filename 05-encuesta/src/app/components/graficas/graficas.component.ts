import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { GraficasService } from 'src/app/service/graficas.service';
import { WebsocketService } from 'src/app/service/websocket.service';

@Component({
  selector: 'app-graficas',
  templateUrl: './graficas.component.html',
  styleUrls: ['./graficas.component.css']
})
export class GraficasComponent implements OnInit {
    lineChartData!: any
  constructor(public graficaserver:GraficasService,public webservice:WebsocketService) { }

  ngOnInit(): void {

    this.lineChartData= {
      datasets: [
        {
          data: [2,0,0,1],
          backgroundColor: 'rgba(255,0,0,0.3)',
          borderColor: 'red',
          pointBackgroundColor: 'rgba(148,159,177,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(148,159,177,0.8)',
          fill: 'origin',
          label: "Ventas",
        }
      ],
      labels: [ 'pregunta 1', 'pregunta 2', 'pregunta 3', 'pregunta 4' ]
    };
      this.escuchar();
  }


  

  
  public lineChartType: ChartType = 'bar';


  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5
      }
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      x: {},
      'y-axis-0':
        {
          position: 'left',
        },
      'y-axis-1': {
        position: 'right',
        grid: {
          color: 'rgba(255,0,0,0.3)',
        },
        ticks: {
          color: 'red'
        }
      }
    },

    
  };

  escuchar(){
    this.webservice.listen('cambio-encuesta').subscribe((data:any)=>{
      console.log(data);
      console.log(data[0].data);
      console.log(data[0].label);
      
      
      this.lineChartData= {
        datasets: [
          {
            data: data[0].data,
            backgroundColor: 'rgba(255,0,0,0.3)',
            borderColor: 'red',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)',
            fill: 'origin',
            label: data[0].label,
          }
        ],
        labels: [ 'pregunta 1', 'pregunta 2', 'pregunta 3', 'pregunta 4' ]
      };
      
      });
   
  }
}
