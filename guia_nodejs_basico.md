# Node.js basico: archivos, JSON e inmutabilidad

## Node.js y npm

- **Node.js** permite ejecutar JavaScript fuera del navegador.
- **npm** es el gestor de paquetes de Node. Con `npm init` se crea el archivo `package.json` que describe el proyecto.

Comandos utiles:

```bash
node archivo.js     # ejecuta un archivo JavaScript
npm init -y         # crea un package.json por defecto
npm install lodash  # instala un paquete (no lo usaremos en estos ejercicios)
```

## Modulos ES: `import` y `export`

En este curso usamos la sintaxis moderna de modulos ES, la misma que se usa en el navegador:

```js
import fs from "fs";
import path from "path";
```

Para que Node.js permita usar `import` en archivos `.js`, el `package.json` debe tener:

```json
{
  "type": "module"
}
```

## Modulo `fs` (file system)

Node trae el modulo `fs` para trabajar con archivos. La forma sincrona bloquea la ejecucion hasta que termina la operacion. Es util para scripts simples.

```js
import fs from "fs";

// Leer un archivo de texto
const texto = fs.readFileSync("datos.txt", "utf-8");

// Escribir un archivo de texto
fs.writeFileSync("resultado.txt", "hola mundo");

// Leer un JSON y convertirlo a objeto/array
const raw = fs.readFileSync("datos.json", "utf-8");
const datos = JSON.parse(raw);

// Convertir un objeto/array a JSON y guardarlo
const json = JSON.stringify(datos, null, 2);
fs.writeFileSync("resultado.json", json);
```

`JSON.stringify(datos, null, 2)` convierte el dato a JSON con indentacion de 2 espacios, para que sea legible.

## Rutas con `path`

Para evitar problemas con barras `/` o `\\`, se usa `path.join`:

```js
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ruta = path.join(__dirname, "data", "usuarios.json");
```

En modulos ES, `__dirname` no existe automaticamente. Se construye a partir de `import.meta.url`, que indica la ruta del archivo actual.

## Inmutabilidad

Significa no modificar los datos originales. En lugar de cambiar un array u objeto, creamos uno nuevo.

Ejemplos:

```js
// map devuelve un nuevo array
const mayusculas = nombres.map((nombre) => nombre.toUpperCase());

// filter devuelve un nuevo array
const activos = usuarios.filter((u) => u.activo);

// para ordenar sin mutar, copiamos primero
const ordenado = [...usuarios].sort((a, b) => {
  if (a.nombre < b.nombre) return -1;
  if (a.nombre > b.nombre) return 1;
  return 0;
});

// copiar un objeto y agregarle una propiedad
const nuevo = { ...usuario, edad: usuario.edad + 1 };
```

Metodos a evitar si queremos ser inmutables:

- `push`, `pop`, `splice`
- `sort` sobre el array original
- modificar propiedades directamente: `obj.prop = valor`

## Estructura del proyecto

```
node-basico/
  package.json
  README.md
  ejercicio1.js
  ejercicio2.js
  ejercicio3.js
  ejercicio4.js
  data/
    usuarios.json
    productos.json
    tareas.json
    estudiantes.json
```

Para ejecutar un ejercicio:

```bash
node ejercicio1.js
```
