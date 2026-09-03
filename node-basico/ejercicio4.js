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

