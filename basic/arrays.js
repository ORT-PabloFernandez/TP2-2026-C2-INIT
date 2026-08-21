const nombres = ["Juan", "María", "Pedro", "Ana"];

// ARRAYS DE OBJETOS
const inventors = [
  { first: "Albert", last: "Einstein", year: 1879 },
  { first: "Isaac", last: "Newton", year: 1643 },
  { first: "Galileo", last: "Galilei", year: 1564 },
  { first: "Marie", last: "Curie", year: 1867 },
  { first: "Johannes", last: "Kepler", year: 1571 },
  { first: "Nicolaus", last: "Copernicus", year: 1473 },
  { first: "Max", last: "Planck", year: 1858 },
];

function printInventors(inventors) {
    console.log("NOMBRE     APELLIDO     AÑO");
    console.log("============================");

    // un callback es un funcion enviada por parametro a otra funcion
    // forEach es un funcion que itera un array y llama al callback por cada elemento del array
    inventors.forEach(
        inventor => console.log(`${inventor.first.padEnd(12, " ")}${inventor.last.padEnd(12, " ")}${inventor.year}`)
    );
}

// function printInventor(inventor) {
//     console.log(`${inventor.first.padEnd(12, " ")}${inventor.last.padEnd(12, " ")}${inventor.year}`);
// }

//const printInventor = inventor => console.log(`${inventor.first.padEnd(12, " ")}${inventor.last.padEnd(12, " ")}${inventor.year}`);

// Ejercicio 1.
// Filtrar los inventores que nacieron en el siglo XIX (1800)
//printInventors(inventors.filter(inventor => inventor.year >= 1800));

// Ejercicio 2.
// Convertir el apellido en mayusculas
printInventors(
    inventors
        .filter(inventor => inventor.year >= 1800)
        .map(
        inventor => {
            return ({
                first: inventor.first,
                last: inventor.last.toUpperCase(),
                year: inventor.year
            })
        } 
));

// Ejercicio 3.
// Ordenar los inventores por año de nacimiento, de menor a mayor
printInventors(inventors.sort((a,b) => a.year - b.year));

//printInventors(inventors);
