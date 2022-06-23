export class EncuestaData{

    private meses:string[]=[ 'pregunta 1', 'pregunta 2', 'pregunta 3', 'pregunta 4' ];

    private data:number[]=[0,0,0,0];

    /**
     *
     */
    constructor() {
    
        
    }


    getDataGrafica(){
        return [ 
            {
            data: this.data,
            label: 'Preguntas',
            }
        ]
    }



    incrementarValor(mes:string){
    mes=mes.toLowerCase().trim();
    for (let i = 0; i < this.meses.length; i++) {
        if(this.meses[i]===mes){
        this.data[i]+=1;
        }
    }

    return this.getDataGrafica();
    
    }

}