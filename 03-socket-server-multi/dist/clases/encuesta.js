"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EncuestaData = void 0;
class EncuestaData {
    /**
     *
     */
    constructor() {
        this.meses = ['pregunta 1', 'pregunta 2', 'pregunta 3', 'pregunta 4'];
        this.data = [0, 0, 0, 0];
    }
    getDataGrafica() {
        return [
            {
                data: this.data,
                label: 'Preguntas',
            }
        ];
    }
    incrementarValor(mes) {
        mes = mes.toLowerCase().trim();
        for (let i = 0; i < this.meses.length; i++) {
            if (this.meses[i] === mes) {
                this.data[i] += 1;
            }
        }
        return this.getDataGrafica();
    }
}
exports.EncuestaData = EncuestaData;
