"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtenerUusuarios = exports.usuarios = exports.mensaje = exports.desconectarCliente = exports.ConnectarCliente = exports.mapaSockets = exports.mapa = exports.UsuariosConectados = void 0;
const usuario_1 = require("../clases/usuario");
const usuarios_lista_1 = require("../clases/usuarios-lista");
const mapa_1 = require("../clases/mapa");
exports.UsuariosConectados = new usuarios_lista_1.UsuarioLista;
exports.mapa = new mapa_1.Mapa();
const mapaSockets = (cliente, io) => {
    cliente.on('marcador-nuevo', (marcador) => {
        exports.mapa.Addmarcador(marcador);
        cliente.broadcast.emit('marcador-nuevo', marcador);
    });
    cliente.on('marcador-borrar', (id) => {
        exports.mapa.borraMarcador(id);
        cliente.broadcast.emit('marcador-borrar', id);
    });
    cliente.on('mover-marcador', (Marcador) => {
        exports.mapa.MoverMarcador(Marcador);
        cliente.broadcast.emit('mover-marcador', Marcador);
    });
};
exports.mapaSockets = mapaSockets;
const ConnectarCliente = (cliente) => {
    const usuario = new usuario_1.Usuario(cliente.id);
    exports.UsuariosConectados.agregar(usuario);
};
exports.ConnectarCliente = ConnectarCliente;
const desconectarCliente = (cliente, io) => {
    cliente.on('disconnect', () => {
        console.log('Cliente desconectado');
        exports.UsuariosConectados.DeleteUsuario(cliente.id);
        io.emit('usuarios-activos', exports.UsuariosConectados.GetAll());
    });
};
exports.desconectarCliente = desconectarCliente;
//Escuchar mensajes 
const mensaje = (cliente, io) => {
    cliente.on('mensaje', (playload) => {
        console.log(playload);
        io.emit('mensaje-nuevo', playload);
    });
};
exports.mensaje = mensaje;
const usuarios = (cliente, io) => {
    cliente.on('configurar-usuario', (playload, callback) => {
        exports.UsuariosConectados.updateNombre(cliente.id, playload.nombre);
        setTimeout(() => {
            io.emit('usuarios-activos', exports.UsuariosConectados.GetAll());
        }, 1000);
        console.log(playload);
        callback({
            ok: true,
            mensaje: 'Usuario configurado'
        });
        //  io.emit('mensaje-nuevo',playload);
    });
};
exports.usuarios = usuarios;
const obtenerUusuarios = (cliente, io) => {
    cliente.on('obtener-usuarios', () => {
        io.to(cliente.id).emit('usuarios-activos', exports.UsuariosConectados.GetAll());
    });
};
exports.obtenerUusuarios = obtenerUusuarios;
