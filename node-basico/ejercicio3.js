/*
  Ejercicio 3

  Leer data/tareas.json, filtrar las tareas completadas, ordenarlas
  alfabeticamente por titulo sin modificar el array original, y
  escribir un resumen en data/tareas-completadas.json.

  El resumen debe tener la forma:
  {
    "cantidad": 3,
    "tareas": [...]
  }

  Objetivos:
  - Combinar filter y map.
  - Ordenar sin mutar con [...array].sort.
  - Escribir un objeto con JSON.stringify.
*/

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const entrada = path.join(__dirname, "data", "tareas.json");
const salida = path.join(__dirname, "data", "tareas-completadas.json");

// Escribe tu codigo aqui
