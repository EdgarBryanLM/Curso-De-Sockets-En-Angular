"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraficaData = void 0;
class GraficaData {
    /**
     *
     */
    constructor() {
        this.meses = ['enero', 'febrero', 'marzo', 'abril'];
        this.data = [1, 2, 3, 4];
    }
    getDataGrafica() {
        return [
            {
                data: this.data,
                label: 'Ventas',
            }
        ];
    }
    incrementarValor(mes, valor) {
        mes = mes.toLowerCase().trim();
        for (let i = 0; i < this.meses.length; i++) {
            if (this.meses[i] === mes) {
                this.data[i] += valor;
            }
        }
        return this.getDataGrafica();
    }
}
exports.GraficaData = GraficaData;
