import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SolicitudMovimiento, TipoMovimiento } from '../models/movimiento';

/** Componente HIJO: formulario y validación; nunca modifica el saldo/historial. */
@Component({
  selector: 'app-nuevo-movimiento',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './nuevo-movimiento.component.html'
})
export class NuevoMovimientoComponent {
  readonly saldoActual = input.required<number>();
  readonly movimientoValidado = output<SolicitudMovimiento>();

  tipo: TipoMovimiento = 'RECARGA';
  montoTexto = '';
  interactuo = false;

  get mensajeError(): string | null {
    const texto = this.montoTexto.trim();
    if (!texto) {
      return 'Ingresa un monto.';
    }
    const normalizado = texto.replace(',', '.');
    if (!/^[+-]?\d+(?:\.\d{1,2})?$/.test(normalizado)) {
      return 'Ingresa un monto numérico válido con máximo 2 decimales.';
    }
    const monto = Number(normalizado);
    if (!Number.isFinite(monto) || monto <= 0) {
      return 'El monto debe ser mayor que cero.';
    }
    if (this.tipo === 'GASTO' && monto > this.saldoActual()) {
      return 'Saldo insuficiente para realizar el gasto.';
    }
    return null;
  }

  registrar(): void {
    this.interactuo = true;
    if (this.mensajeError !== null) {
      return;
    }
    const monto = Number(this.montoTexto.trim().replace(',', '.'));
    this.movimientoValidado.emit({ tipo: this.tipo, monto });
    this.montoTexto = '';
    this.interactuo = false;
  }
}
