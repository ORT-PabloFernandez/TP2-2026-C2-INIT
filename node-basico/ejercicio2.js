/*
  Ejercicio 2

  Leer data/productos.json, agregar a cada producto la propiedad
  precioConIva con el 21% de aumento, y guardar el resultado en
  data/productos-con-iva.json.

  Objetivos:
  - Leer y escribir JSON de forma sincrona.
  - Usar map para crear objetos nuevos (inmutable).
  - Usar JSON.stringify con indentacion.

  Ejemplo de objeto dentro del array resultante:
  { id: 1, nombre: "Lapicera", precio: 120, precioConIva: 145.2 }
*/

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const entrada = path.join(__dirname, "data", "productos.json");
const salida = path.join(__dirname, "data", "productos-con-iva.json");

// Escribe tu codigo aqui
