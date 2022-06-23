"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const enviroment_1 = require("../global/enviroment");
const socket_io_1 = __importDefault(require("socket.io"));
const http_1 = __importDefault(require("http"));
const socket = __importStar(require("../sockets/sockets"));
class Server {
    /**
     *
     */
    constructor() {
        this.app = (0, express_1.default)();
        this.port = enviroment_1.SERVER_PORT;
        this.hhtServer = new http_1.default.Server(this.app);
        this.io = new socket_io_1.default.Server(this.hhtServer, { cors: { origin: true, credentials: true } });
        this.EscucharSockets();
    }
    static get intance() {
        return this.instance || (this.instance = new this());
    }
    EscucharSockets() {
        console.log("Escuchando conexiones");
        this.io.on('connection', cliente => {
            /* console.log('Nuevo cliente'); */
            //conectar cliente
            socket.ConnectarCliente(cliente);
            //Usuarios
            socket.usuarios(cliente, this.io);
            //Obtener-Usuarios
            socket.obtenerUusuarios(cliente, this.io);
            //Desconectar
            socket.desconectarCliente(cliente, this.io);
            //Mensajes
            socket.mensaje(cliente, this.io);
            socket.mapaSockets(cliente, this.io);
        });
    }
    start(callback) {
        this.hhtServer.listen(this.port, callback);
    }
}
exports.default = Server;
