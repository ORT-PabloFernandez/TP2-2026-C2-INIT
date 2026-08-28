/*
  Ejercicio 1

  Leer data/usuarios.json y mostrar por consola un array con los nombres
  en mayusculas.

  Objetivos:
  - Leer un archivo JSON de forma sincrona.
  - Usar JSON.parse.
  - Usar map sin modificar el array original.

  Resultado esperado:
  [ 'ANA', 'JUAN', 'MARIA', 'PEDRO' ]
*/

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rutaUsuarios = path.join(__dirname, "data", "usuarios.json");

// Escribe tu codigo aqui
