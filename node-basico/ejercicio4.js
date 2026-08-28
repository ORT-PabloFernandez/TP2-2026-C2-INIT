/*
  Ejercicio 4

  Leer data/estudiantes.json y generar un reporte en
  data/reporte-estudiantes.json con la siguiente informacion:

  {
    "fecha": "2026-08-27T...",
    "total": 5,
    "aprobados": 3,
    "desaprobados": 2,
    "promedioGeneral": 6.6,
    "estudiantes": [
      { "id": 1, "nombre": "Carlos", "promedio": 7, "estado": "aprobado" },
      ...
    ]
  }

  Reglas:
  - Promedio = suma de notas / cantidad de notas.
  - Aprobado si promedio >= 6.
  - Todo debe hacerse con funciones inmutables.

  Objetivos:
  - Encadenar transformaciones.
  - Usar reduce para sumar.
  - Generar un reporte estructurado.
*/

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const entrada = path.join(__dirname, "data", "estudiantes.json");
const salida = path.join(__dirname, "data", "reporte-estudiantes.json");

// Escribe tu codigo aqui
