import { Component } from '@angular/core';
import { BilleteraComponent } from './billetera/billetera.component';

/** AppComponent es solo el contenedor generado por Angular. */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BilleteraComponent],
  template: '<app-billetera />'
})
export class AppComponent {}
