"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const server_1 = __importDefault(require("../clases/server"));
const sockets_1 = require("../sockets/sockets");
const router = (0, express_1.Router)();
router.get('/mensajes', (red, res) => {
    res.json({
        ok: true,
        mensaje: 'Todo bien todo fine'
    });
});
router.post('/mensajes', (req, res) => {
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const server = server_1.default.intance;
    const playload = {
        de,
        cuerpo
    };
    server.io.emit('mensaje-nuevo', playload);
    res.json({
        ok: true,
        mensaje: cuerpo + de
    });
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
