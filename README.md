# Caso 2 — Billetera Digital con Angular

## Tecnologías y versiones

- **Node.js:** 20.11+ o 22.x (recomendado Node 22 LTS compatible).
- **npm:** versión incluida con Node.
- **Angular:** 19.2.x (standalone components).
- **TypeScript:** 5.8.x.
- **Bootstrap:** 5.3.6, CSS local.

## Cómo ejecutarlo desde VS Code

1. Instala Node.js en tu computadora.
2. Abre la carpeta `caso-2-angular` en VS Code.
3. Abre **Terminal > Nuevo terminal**.
4. Verifica que Node y npm estén instalados:

   ```bash
   node -v
   npm -v
   ```

5. Instala las dependencias:

   ```bash
   npm install
   ```

6. Inicia el servidor local:

   ```bash
   npm start
   ```

7. Si el navegador no se abre automáticamente, entra en **http://localhost:4200/**.
8. Para detener el servidor: **Ctrl + C** en la terminal.

## Estructura y comunicación

- `AppComponent`: solo contenedor, no añade funcionalidad; no cuenta como tercer componente funcional.
- `BilleteraComponent` (PADRE): inicializa saldo a 250, almacena historial y lo presenta usando `@for` y `@if`.
- `NuevoMovimientoComponent` (HIJO): formulario con Bootstrap. Recibe saldo usando `input.required<number>()`, valida y emite movimiento válido por `output<SolicitudMovimiento>()`.
- `models/movimiento.ts`: tipos de datos compartidos; **no es** un componente ni un servicio.
- No hay servicios, rutas, backend ni base de datos.

## Validaciones

El hijo bloquea el botón si el campo está vacío, tiene letras, cero, número negativo, más de dos decimales, o si el gasto excede el saldo. Además, muestra el mensaje de error con `@if` cuando el usuario interactúa con el formulario. El padre verifica la validez nuevamente antes de alterar el estado.

El historial inicia vacío. Cada movimiento aceptado se agrega al inicio mediante `unshift`.

## Crear compilación de producción

```bash
npm run build:prod
```

El resultado se guarda en `dist/billetera-angular-t1/browser/`.

## GitHub (entregable)

Este caso va en un **repositorio distinto** al de Servlet + JSP.

```bash
git init
git add .
git commit -m "Caso 2: billetera Angular"
# Crea antes tu repositorio vacío en GitHub y pega la URL real.
git remote add origin URL_REAL_DE_TU_REPOSITORIO
git branch -M main
git push -u origin main
```

El directorio `node_modules/` no se sube: está excluido por `.gitignore`.
