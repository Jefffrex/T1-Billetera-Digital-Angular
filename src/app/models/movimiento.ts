export type TipoMovimiento = 'RECARGA' | 'GASTO';

export interface SolicitudMovimiento {
  tipo: TipoMovimiento;
  monto: number;
}

export interface Movimiento extends SolicitudMovimiento {
  id: number;
}
