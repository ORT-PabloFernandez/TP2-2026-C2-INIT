// Javascript es un lenguaje de tipado dinámico, lo que significa que no es necesario declarar el tipo de una variable al momento de su creación. El tipo de la variable se determina automáticamente en tiempo de ejecución según el valor que se le asigne.
let saludo = "Hola Mundo!"; // Asignamos un valor de tipo string a la variable saludo
const saludo2 = "Hola Mundo 2!"; // Asignamos un valor de tipo string a la variable saludo2

//saludo2 = "Hola Mundo 3!"; // Esto generará un error, ya que saludo2 es una constante y no puede ser reasignada

console.log(typeof saludo); // Imprime "string"
console.log(typeof saludo2); // Imprime "string"

let saludo3 = "Hola Mundo 3!"; // Asignamos un valor de tipo string a la variable saludo3
//let saludo3 = "Hola Mundo 4!"; // Reasignamos un nuevo valor a la variable saludo3
if(saludo == "Hola Mundo!"){
    let saludo3 = "Hola Mundo 5!"; // Reasignamos un nuevo valor a la variable saludo3 dentro del bloque if
    console.log(saludo3); // Imprime "Hola Mundo 5!"
}
console.log(typeof saludo3); // Imprime "string"

// STRINGS
let nombre = "Juan";
let apellido = 'Pérez';
let saludoCompleto = `Hola, ${nombre} ${apellido}! que tengas un buen dia 😊`; // Usamos template literals para concatenar strings
let saludoCompleto2 = "Hola, " + nombre + " " + apellido + "! que tengas un buen dia"; // Usamos concatenación de strings

// NUMBERS
let numero1 = 10;
let numero2 = -0;

let num3 = numero1 / 0 ;
console.log(num3); // Imprime Infinity

let num4 = 0 / 0 ;
console.log(num4); // Imprime NaN (Not a Number)

// Objects
const persona = {
    nombre: "Juan",
    apellido: "Pérez",
    edad: 30,
    direccion: {
        calle: "Calle Falsa",
        numero: 123
    }
}

Object.freeze(persona); // Congelamos el objeto persona para que no pueda ser modificado

persona.nombre = "Pedro"; 
console.log(persona); 

// Typescript es un lenguaje de tipado estático, lo que significa que es necesario declarar el tipo de una variable al momento de su creación. El tipo de la variable se determina en tiempo de compilación y no puede ser cambiado en tiempo de ejecución.