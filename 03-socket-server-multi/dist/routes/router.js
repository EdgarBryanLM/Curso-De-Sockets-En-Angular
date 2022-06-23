"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const server_1 = __importDefault(require("../clases/server"));
const sockets_1 = require("../sockets/sockets");
const grafica_1 = require("../clases/grafica");
const encuesta_1 = require("../clases/encuesta");
const mapa_1 = require("../clases/mapa");
const router = (0, express_1.Router)();
const grafica = new grafica_1.GraficaData();
const encuesta = new encuesta_1.EncuestaData();
const mapa = new mapa_1.Mapa();
router.get('/mapa', (red, res) => {
    res.json(mapa.getMarcadores());
});
router.get('/grafica', (red, res) => {
    res.json(grafica.getDataGrafica());
});
router.post('/grafica', (req, res) => {
    const mes = req.body.mes;
    const data = req.body.data;
    grafica.incrementarValor(mes, Number(data));
    const server = server_1.default.intance;
    server.io.emit('cambio-grafica', grafica.getDataGrafica());
    res.json(grafica.getDataGrafica());
});
router.get('/encuesta', (red, res) => {
    res.json(grafica.getDataGrafica());
});
router.post('/encuesta', (req, res) => {
    const pregunta = req.body.pregunta;
    encuesta.incrementarValor(pregunta);
    const server = server_1.default.intance;
    server.io.emit('cambio-encuesta', encuesta.getDataGrafica());
    res.json(encuesta.getDataGrafica());
});
router.post('/mensajes/:id', (req, res) => {
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const id = req.params.id;
    const playload = {
        de,
        cuerpo
    };
    const server = server_1.default.intance;
    server.io.in(id).emit('mensaje-privado', playload);
    res.json({
        ok: true,
        mensaje: cuerpo + de + id
    });
});
//Servicio para obtener id de ususarios
router.post('/usuarios', (req, res) => {
    const server = server_1.default.intance;
    server.io.allSockets().then((clientes) => {
        res.json({
            ok: true,
            // clientes
            clientes: Array.from(clientes)
        });
    }).catch((err) => {
        res.json({
            ok: false,
            err
        });
    });
});
//Obtener Usuarios y sus nombres
router.post('/usuarios/detalle', (req, res) => {
    res.json({
        ok: true,
        clientes: sockets_1.UsuariosConectados.GetAll()
    });
});
//usuarios-activos
exports.default = router;
