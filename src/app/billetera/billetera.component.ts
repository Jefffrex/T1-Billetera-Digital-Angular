import { Component } from '@angular/core';
import { NuevoMovimientoComponent } from '../nuevo-movimiento/nuevo-movimiento.component';
import { Movimiento, SolicitudMovimiento } from '../models/movimiento';

/** Componente PADRE: dueño exclusivo de saldo e historial. */
@Component({
  selector: 'app-billetera',
  standalone: true,
  imports: [NuevoMovimientoComponent],
  templateUrl: './billetera.component.html'
})
export class BilleteraComponent {
  saldo = 250.00;
  movimientos: Movimiento[] = [];
  private siguienteId = 1;

  registrarMovimiento(solicitud: SolicitudMovimiento): void {
    const { tipo, monto } = solicitud;
    // Seguridad en el padre, aunque el hijo ya haya validado.
    const centimos = Math.round(monto * 100);
    if (!Number.isFinite(monto) || monto <= 0 ||
        !Number.isSafeInteger(centimos) || Math.abs(monto * 100 - centimos) > 0.0000001) {
      return;
    }
    if (tipo !== 'RECARGA' && tipo !== 'GASTO') {
      return;
    }
    const saldoCentimos = Math.round(this.saldo * 100);
    if (tipo === 'GASTO' && centimos > saldoCentimos) {
      return;
    }
    const nuevoSaldoCentimos = tipo === 'RECARGA' ? saldoCentimos + centimos : saldoCentimos - centimos;
    if (!Number.isSafeInteger(nuevoSaldoCentimos)) {
      return;
    }
    this.saldo = nuevoSaldoCentimos / 100;
    this.movimientos.unshift({ id: this.siguienteId++, tipo, monto });
  }
}
