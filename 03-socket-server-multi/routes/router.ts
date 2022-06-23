import {Router,Request,Response} from 'express';
import Server from '../clases/server';
import { UsuariosConectados } from '../sockets/sockets';
import { GraficaData } from '../clases/grafica';
import { EncuestaData } from '../clases/encuesta';
import { Mapa } from '../clases/mapa';

 const router=Router();

 const grafica= new GraficaData();
 const encuesta= new EncuestaData();
 const mapa=new Mapa();


 router.get('/mapa',(red:Request,res:Response)=>{
    res.json(mapa.getMarcadores());

});











router.get('/grafica',(red:Request,res:Response)=>{
    res.json(grafica.getDataGrafica());

});


router.post('/grafica',(req:Request,res:Response)=>{
    const mes=req.body.mes;
    const data=req.body.data;
    grafica.incrementarValor(mes,Number(data));
    const server=Server.intance;
    server.io.emit('cambio-grafica',grafica.getDataGrafica());
    res.json(grafica.getDataGrafica());

});



router.get('/encuesta',(red:Request,res:Response)=>{
    res.json(grafica.getDataGrafica());

});


router.post('/encuesta',(req:Request,res:Response)=>{
    const pregunta=req.body.pregunta;
    encuesta.incrementarValor(pregunta);
    const server=Server.intance;
    server.io.emit('cambio-encuesta',encuesta.getDataGrafica());
    res.json(encuesta.getDataGrafica());

});




router.post('/mensajes/:id',(req:Request,res:Response)=>{
    const cuerpo=req.body.cuerpo;
    const de=req.body.de;
    const id=req.params.id;
    const playload={
        de,
        cuerpo
    };
    const server=Server.intance;
    server.io.in(id).emit('mensaje-privado',playload);
    res.json({
    ok:true,
    mensaje: cuerpo+de+id
    });
});


//Servicio para obtener id de ususarios
router.post('/usuarios',(req:Request,res:Response)=>{
    const server=Server.intance;
    server.io.allSockets().then((clientes)=>{
        res.json({
            ok:true,
           // clientes
            clientes: Array.from(clientes)
        });
    }).catch((err)=>{
        res.json({
            ok:false,
            err
        })
    });
});


//Obtener Usuarios y sus nombres
router.post('/usuarios/detalle',(req:Request,res:Response)=>{

    res.json({
        ok:true,
        clientes:UsuariosConectados.GetAll()
    });
});


//usuarios-activos

export default router;