"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioLista = void 0;
class UsuarioLista {
    /**
     *
     */
    constructor() {
        this.lista = [];
    }
    //agregar usuario
    agregar(usuario) {
        this.lista.push(usuario);
        console.log(this.lista);
        return usuario;
    }
    updateNombre(id, nuevoNombre) {
        this.lista.forEach(usu => {
            if (usu.id === id) {
                usu.nombre = nuevoNombre;
                return;
            }
        });
        console.log(this.lista);
    }
    GetAll() {
        return this.lista.filter(usua => usua.nombre !== 'sin nombre');
    }
    GetUsuario(id) {
        this.lista.forEach(usu => {
            if (usu.id === id) {
                return usu;
            }
        });
    }
    GetSala(sala) {
        return this.lista.filter(usu => {
            usu.sala === sala;
        });
    }
    DeleteUsuario(id) {
        const temUsuario = this.GetUsuario(id);
        this.lista = this.lista.filter(usu => {
            usu.id !== id;
        });
        console.log(this.lista);
    }
}
exports.UsuarioLista = UsuarioLista;
