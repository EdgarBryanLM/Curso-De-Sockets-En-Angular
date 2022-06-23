export class GraficaData{

    private meses:string[]=[ 'enero', 'febrero', 'marzo', 'abril' ];

    private data:number[]=[1,2,3,4];

    /**
     *
     */
    constructor() {
    
        
    }


    getDataGrafica(){
        return [ 
            {
            data: this.data,
            label: 'Ventas',
            }
        ]
    }



    incrementarValor(mes:string,valor:number){
    mes=mes.toLowerCase().trim();
    for (let i = 0; i < this.meses.length; i++) {
        if(this.meses[i]===mes){
        this.data[i]+=valor;
        }
    }

    return this.getDataGrafica();
    
    }

}