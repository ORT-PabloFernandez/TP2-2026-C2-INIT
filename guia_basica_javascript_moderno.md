# Guía básica de JavaScript moderno

## Objetivo

Esta guía presenta las herramientas esenciales de JavaScript moderno usando como hilo conductor un **directorio de usuarios**. Al finalizar podrás:

- declarar variables con `const` y `let`;
- reconocer los tipos de datos principales;
- crear y consultar objetos y arrays;
- trabajar con arrays de objetos;
- escribir funciones tradicionales y funciones flecha;
- utilizar `forEach`, `map`, `find`, `filter`, `some`, `every` y `reduce`;
- aplicar desestructuración, spread, template literals y encadenamiento opcional;
- elegir el método de array adecuado para cada problema.

---

## 1. ¿Qué es JavaScript?

JavaScript es un lenguaje de programación que permite agregar lógica y comportamiento a una aplicación. En una página web puede:

- reaccionar a clics y otros eventos;
- validar formularios;
- transformar datos;
- crear o modificar elementos del DOM;
- comunicarse con servidores;
- guardar información en el navegador.

JavaScript es un lenguaje de **tipado dinámico**: una variable no necesita declarar de antemano qué tipo de dato almacenará.

```js
let value = 25;
value = 'veinticinco';
```

Esto es válido, aunque cambiar el tipo de una variable sin una buena razón puede volver el código difícil de entender.

---

## 2. Variables: `const`, `let` y `var`

Una variable asocia un nombre con un valor.

### `const`: la opción predeterminada

Usa `const` cuando la variable no será reasignada.

```js
const courseName = 'Desarrollo Web';
const minimumAge = 18;
```

Esto produce un error:

```js
const name = 'Ana';
name = 'Luis'; // TypeError
```

### `let`: cuando habrá reasignación

```js
let clickCount = 0;
clickCount = clickCount + 1;
```

También puede abreviarse:

```js
clickCount += 1;
```

### `var`: código antiguo

`var` fue la forma tradicional de declarar variables. Tiene reglas de alcance distintas y puede generar confusión. En código moderno se recomienda comenzar con `const` y usar `let` cuando sea necesario reasignar.

### Importante: `const` no vuelve inmutable un objeto

`const` impide reasignar la variable, pero permite modificar el contenido del objeto o array referenciado.

```js
const user = { name: 'Ana' };
user.name = 'Ana María'; // permitido

const roles = ['Diseño'];
roles.push('Desarrollo'); // permitido
```

Lo que no está permitido es reemplazar la referencia:

```js
user = { name: 'Pedro' }; // error
roles = [];               // error
```

### Alcance de bloque

`const` y `let` existen únicamente dentro del bloque donde fueron declaradas.

```js
if (true) {
  const message = 'Hola';
  let count = 1;
}

console.log(message); // error: no existe aquí
```

---

## 3. Tipos de datos principales

### Valores primitivos

```js
const name = 'Ada';        // string
const age = 36;            // number
const isActive = true;     // boolean
const emptyValue = null;   // null
let pendingValue;          // undefined
const largeNumber = 10n;   // bigint
const uniqueKey = Symbol(); // symbol
```

Puedes consultar el tipo con `typeof`:

```js
typeof name;     // "string"
typeof age;      // "number"
typeof isActive; // "boolean"
```

Por una particularidad histórica de JavaScript:

```js
typeof null; // "object"
```

### Objetos

Los objetos agrupan valores relacionados mediante propiedades.

```js
const user = {
  id: 1,
  name: 'Ada Lovelace',
  role: 'Programadora',
  isActive: true
};
```

Los arrays y las funciones también son objetos en JavaScript, aunque se usan con sintaxis y objetivos específicos.

---

## 4. Operadores esenciales

### Aritméticos

```js
const sum = 5 + 3;       // 8
const difference = 5 - 3; // 2
const product = 5 * 3;   // 15
const division = 6 / 3;  // 2
const remainder = 7 % 2; // 1
```

### Comparación estricta

```js
5 === 5;   // true
5 === '5'; // false
5 !== '5'; // true
5 > 3;     // true
```

Prefiere `===` y `!==`. Los operadores `==` y `!=` convierten tipos antes de comparar y pueden producir resultados inesperados.

### Lógicos

```js
const canEnter = isActive && age >= 18; // AND
const hasPermission = isAdmin || isOwner; // OR
const isDisabled = !isActive; // NOT
```

### Operador ternario

```js
const status = isActive ? 'Activo' : 'Inactivo';
```

Es útil para decisiones cortas. Para lógica extensa, un `if` suele ser más legible.

### Nullish coalescing: `??`

Usa el valor de la derecha solo cuando el de la izquierda es `null` o `undefined`.

```js
const clickCount = user.clickCount ?? 0;
```

A diferencia de `||`, conserva valores válidos como `0`, `false` y `''`.

---

## 5. Condicionales

```js
if (user.isActive) {
  console.log('Usuario activo');
} else {
  console.log('Usuario inactivo');
}
```

También puedes encadenar condiciones:

```js
if (score >= 90) {
  console.log('Excelente');
} else if (score >= 60) {
  console.log('Aprobado');
} else {
  console.log('Debe mejorar');
}
```

### Valores truthy y falsy

En una condición, estos valores se consideran falsos:

```text
false, 0, -0, 0n, "", null, undefined, NaN
```

Los demás valores son generalmente verdaderos, incluidos `[]` y `{}`.

---

## 6. Objetos

Un objeto reúne propiedades relacionadas mediante pares `clave: valor`.

```js
const user = {
  id: 1,
  name: 'Ada Lovelace',
  role: 'Programadora',
  location: 'Londres',
  isActive: true
};
```

### Leer propiedades

```js
console.log(user.name);      // Ada Lovelace
console.log(user['role']);   // Programadora
```

La notación con corchetes es útil si el nombre de la propiedad se encuentra en una variable:

```js
const propertyName = 'location';
console.log(user[propertyName]); // Londres
```

### Agregar y modificar propiedades

```js
user.email = 'ada@example.com';
user.isActive = false;
```

### Métodos

Una propiedad cuyo valor es una función se llama método.

```js
const user = {
  name: 'Ada',
  greet() {
    return `Hola, soy ${this.name}`;
  }
};

user.greet(); // "Hola, soy Ada"
```

En métodos que necesitan `this`, una función tradicional suele ser la opción apropiada. Las funciones flecha no crean su propio `this`.

### Desestructuración de objetos

Permite extraer propiedades en variables.

```js
const { name, role } = user;
console.log(name);
console.log(role);
```

Se pueden definir otro nombre y un valor predeterminado:

```js
const {
  name: userName,
  image = 'default-avatar.png'
} = user;
```

### Copiar y actualizar con spread

```js
const updatedUser = {
  ...user,
  isActive: false
};
```

Esto crea un objeto nuevo. El spread realiza una copia superficial: los objetos anidados continúan compartiendo referencias.

### Encadenamiento opcional

```js
const city = user.address?.city;
```

Si `address` no existe, el resultado será `undefined` en lugar de producir un error.

---

## 7. Arrays

Un array es una colección ordenada. Sus posiciones comienzan en cero.

```js
const roles = ['Diseño', 'Desarrollo', 'Marketing'];

roles[0];       // "Diseño"
roles.length;   // 3
roles.at(-1);   // "Marketing"
```

### Agregar y quitar elementos

```js
const names = ['Ana', 'Luis'];

names.push('Marta');    // agrega al final
names.pop();            // quita del final
names.unshift('Pedro'); // agrega al comienzo
names.shift();          // quita del comienzo
```

Estos métodos modifican el array original.

### Comprobar contenido

```js
roles.includes('Diseño'); // true
roles.indexOf('Marketing'); // 2
```

### Copiar y combinar con spread

```js
const original = ['Ana', 'Luis'];
const copy = [...original];
const extended = [...original, 'Marta'];
```

### Desestructuración de arrays

```js
const [firstUser, secondUser] = users;
```

También puedes recoger el resto:

```js
const [first, ...remaining] = users;
```

---

## 8. Arrays de objetos

Esta estructura es muy común en aplicaciones web:

```js
const users = [
  {
    id: 1,
    name: 'Ada Lovelace',
    role: 'Programadora',
    location: 'Londres',
    age: 36,
    isActive: true
  },
  {
    id: 2,
    name: 'Grace Hopper',
    role: 'Científica informática',
    location: 'Nueva York',
    age: 85,
    isActive: false
  },
  {
    id: 3,
    name: 'Margaret Hamilton',
    role: 'Ingeniera de software',
    location: 'Indiana',
    age: 86,
    isActive: true
  }
];
```

Para acceder a un dato necesitas primero la posición y luego la propiedad:

```js
users[0].name; // "Ada Lovelace"
```

Sin embargo, normalmente no se conoce la posición exacta. Para eso existen métodos como `find`, `filter` y `map`.

---

## 9. Funciones

Una función agrupa instrucciones reutilizables.

### Declaración de función

```js
function greet(name) {
  return `Hola, ${name}`;
}

const message = greet('Ada');
```

- `name` es un parámetro.
- `'Ada'` es un argumento.
- `return` entrega el resultado y termina la ejecución de la función.

### Parámetros predeterminados

```js
function greet(name = 'visitante') {
  return `Hola, ${name}`;
}
```

### Expresión de función

```js
const greet = function (name) {
  return `Hola, ${name}`;
};
```

### Función flecha

```js
const greet = (name) => {
  return `Hola, ${name}`;
};
```

Si contiene una sola expresión, puede usar retorno implícito:

```js
const greet = name => `Hola, ${name}`;
const add = (a, b) => a + b;
```

Sin parámetros se necesitan paréntesis:

```js
const showMessage = () => console.log('Hola');
```

Para devolver directamente un objeto, rodéalo con paréntesis:

```js
const createUser = (id, name) => ({ id, name });
```

Sin esos paréntesis, las llaves se interpretarían como el cuerpo de la función.

### Funciones callback

Una callback es una función entregada a otra función para que sea ejecutada.

```js
users.forEach(user => {
  console.log(user.name);
});
```

La arrow `user => ...` es la callback que `forEach` ejecuta una vez por usuario.

### ¿Función tradicional o arrow?

Usa arrow functions especialmente para:

- callbacks cortas;
- transformaciones con `map`;
- condiciones con `filter` o `find`;
- funciones que no necesitan su propio `this`.

Usa funciones tradicionales cuando:

- quieras una declaración con nombre disponible en todo su ámbito;
- el comportamiento de `this` sea parte de la función;
- escribas un método DOM basado en `this`, por ejemplo un manejador tradicional.

---

## 10. Métodos de arrays

Los métodos siguientes reciben una callback. La callback suele aceptar:

```js
(element, index, array) => { /* ... */ }
```

Normalmente solo necesitas el primer parámetro.

### `forEach`: realizar una acción por cada elemento

```js
users.forEach(user => {
  console.log(user.name);
});
```

Con índice:

```js
users.forEach((user, index) => {
  console.log(`${index + 1}. ${user.name}`);
});
```

`forEach` se usa para efectos secundarios: imprimir, modificar el DOM o llamar otra función. Su resultado es siempre `undefined`; no crea un nuevo array.

```js
users.forEach(user => {
  const card = createUserCard(user);
  userList.appendChild(card);
});
```

### `map`: transformar cada elemento

`map` devuelve un nuevo array con un resultado por cada elemento original.

```js
const names = users.map(user => user.name);
// ["Ada Lovelace", "Grace Hopper", "Margaret Hamilton"]
```

Crear nuevos objetos:

```js
const summaries = users.map(user => ({
  id: user.id,
  label: `${user.name} — ${user.role}`
}));
```

El array original no se modifica.

### `find`: encontrar un solo elemento

Devuelve el primer elemento que cumple la condición, o `undefined`.

```js
const user = users.find(user => user.id === 2);
```

Conviene contemplar que podría no existir:

```js
const user = users.find(user => user.id === 99);

if (!user) {
  console.log('Usuario no encontrado');
}
```

También puedes usar encadenamiento opcional:

```js
const userName = users.find(user => user.id === 2)?.name;
```

### `filter`: seleccionar varios elementos

Devuelve un nuevo array con todos los elementos que cumplen la condición.

```js
const activeUsers = users.filter(user => user.isActive);
```

Varias condiciones:

```js
const activeDevelopers = users.filter(user =>
  user.isActive && user.role.includes('software')
);
```

Si ninguno coincide, el resultado es `[]`.

### `some`: comprobar si al menos uno cumple

```js
const hasActiveUsers = users.some(user => user.isActive);
```

Devuelve `true` o `false` y deja de recorrer cuando encuentra una coincidencia.

### `every`: comprobar si todos cumplen

```js
const allHaveLocation = users.every(user => Boolean(user.location));
```

También devuelve un booleano.

### `findIndex`: encontrar la posición

```js
const index = users.findIndex(user => user.id === 2);
```

Devuelve el índice o `-1` si no encuentra el elemento.

### `reduce`: acumular un único resultado

```js
const totalAge = users.reduce((total, user) => {
  return total + user.age;
}, 0);
```

Versión corta:

```js
const totalAge = users.reduce(
  (total, user) => total + user.age,
  0
);
```

El `0` es el valor inicial del acumulador. `reduce` también puede construir objetos:

```js
const usersById = users.reduce((result, user) => {
  result[user.id] = user;
  return result;
}, {});
```

Resultado aproximado:

```js
{
  1: { id: 1, name: 'Ada Lovelace', /* ... */ },
  2: { id: 2, name: 'Grace Hopper', /* ... */ },
  3: { id: 3, name: 'Margaret Hamilton', /* ... */ }
}
```

No uses `reduce` solo porque permite escribir menos líneas. Si un `for...of`, `map` o `filter` comunica mejor la intención, suele ser preferible.

### `sort` y `toSorted`: ordenar

`sort` modifica el array original:

```js
users.sort((a, b) => a.age - b.age);
```

`toSorted` crea un array nuevo:

```js
const usersByAge = users.toSorted((a, b) => a.age - b.age);
```

Para texto:

```js
const usersByName = users.toSorted((a, b) =>
  a.name.localeCompare(b.name)
);
```

---

## 11. Cómo elegir el método correcto

| Necesidad | Método | Resultado |
|---|---|---|
| Ejecutar una acción por elemento | `forEach` | `undefined` |
| Transformar todos los elementos | `map` | nuevo array |
| Encontrar el primer elemento | `find` | elemento o `undefined` |
| Conservar los que cumplen | `filter` | nuevo array |
| Saber si alguno cumple | `some` | booleano |
| Saber si todos cumplen | `every` | booleano |
| Obtener la posición de uno | `findIndex` | índice o `-1` |
| Acumular un resultado | `reduce` | cualquier valor |
| Crear una copia ordenada | `toSorted` | nuevo array |

Regla práctica:

```text
¿Quiero una acción?              → forEach
¿Quiero otro array igual de largo? → map
¿Quiero un solo elemento?        → find
¿Quiero algunos elementos?       → filter
¿Quiero sí o no?                 → some / every
¿Quiero un total u objeto?       → reduce
```

---

## 12. Encadenar métodos

Los métodos que devuelven arrays pueden encadenarse.

```js
const activeUserNames = users
  .filter(user => user.isActive)
  .map(user => user.name)
  .toSorted((a, b) => a.localeCompare(b));
```

Lee el flujo de izquierda a derecha:

1. conservar usuarios activos;
2. convertirlos en nombres;
3. ordenar esos nombres.

Otro ejemplo:

```js
const firstActiveEngineer = users
  .filter(user => user.isActive)
  .find(user => user.role.includes('Ingeniera'));
```

En este caso puede simplificarse porque `find` ya acepta toda la condición:

```js
const firstActiveEngineer = users.find(user =>
  user.isActive && user.role.includes('Ingeniera')
);
```

---

## 13. Inmutabilidad práctica

En interfaces web suele ser útil crear nuevos arrays y objetos en vez de modificar los existentes.

### Agregar sin modificar

```js
const newUser = { id: 4, name: 'Linus Torvalds' };
const updatedUsers = [...users, newUser];
```

### Actualizar un usuario

```js
const updatedUsers = users.map(user =>
  user.id === 2
    ? { ...user, isActive: true }
    : user
);
```

### Eliminar un usuario

```js
const updatedUsers = users.filter(user => user.id !== 2);
```

Estos patrones producen colecciones nuevas y hacen más predecibles los cambios.

---

## 14. Bucles tradicionales y `for...of`

Los métodos de array no reemplazan todos los bucles.

### `for...of`

```js
for (const user of users) {
  if (!user.isActive) continue;
  console.log(user.name);
}
```

`for...of` es útil si necesitas `break`, `continue` o `await` secuencial.

### `for` clásico

```js
for (let index = 0; index < users.length; index += 1) {
  console.log(users[index].name);
}
```

### No confundir `for...of` con `for...in`

```js
for (const user of users) { /* valores */ }
for (const key in user) { /* nombres de propiedades */ }
```

Para arrays, normalmente usa `for...of` y no `for...in`.

---

## 15. Ejemplo integrado: directorio de usuarios

```js
const users = getUsers();

const activeUsers = users.filter(user => user.isActive);

const cards = activeUsers.map(user => createUser(
  user.name,
  user.role,
  user.location,
  user.description,
  user.image,
  user.id
));

const userList = document.getElementById('user-list');

cards.forEach(card => {
  userList.appendChild(card);
});
```

Una versión con desestructuración:

```js
const cards = users
  .filter(({ isActive }) => isActive)
  .map(({ name, role, location, description, image, id }) =>
    createUser(name, role, location, description, image, id)
  );
```

La primera versión puede resultar más clara para quien está comenzando. La sintaxis más corta no siempre es la más didáctica.

### Buscar un usuario desde una URL

```js
const params = new URLSearchParams(window.location.search);
const requestedId = Number(params.get('id'));
const selectedUser = users.find(user => user.id === requestedId);

if (!selectedUser) {
  console.error('Usuario no encontrado');
} else {
  console.log(selectedUser.name);
}
```

Es necesario usar `Number` porque los parámetros de la URL se obtienen como strings.

---

## 16. Errores frecuentes

### Usar `map` sin retornar

```js
const names = users.map(user => {
  user.name; // falta return
});
```

El resultado será un array de valores `undefined`. Corrige así:

```js
const names = users.map(user => user.name);
```

O bien:

```js
const names = users.map(user => {
  return user.name;
});
```

### Esperar que `forEach` devuelva un array

```js
const names = users.forEach(user => user.name);
// names es undefined
```

Para transformar, usa `map`.

### Confundir `find` y `filter`

```js
users.find(user => user.isActive);   // un objeto o undefined
users.filter(user => user.isActive); // un array
```

### Confundir asignación y comparación

```js
user.id = 2;   // asigna
user.id === 2; // compara
```

### Olvidar que `find` puede devolver `undefined`

```js
const name = users.find(user => user.id === 99).name; // puede fallar
```

Una alternativa segura:

```js
const name = users.find(user => user.id === 99)?.name ?? 'Desconocido';
```

### Modificar accidentalmente con `sort`

```js
const sorted = users.sort(compareUsers); // users también cambia
```

Si necesitas conservar el orden original:

```js
const sorted = users.toSorted(compareUsers);
// o: [...users].sort(compareUsers)
```

### Usar una arrow cuando se necesita `this`

```js
button.addEventListener('click', () => {
  console.log(this); // no es el botón
});
```

Usa `event.currentTarget`, que expresa mejor la intención:

```js
button.addEventListener('click', event => {
  console.log(event.currentTarget);
});
```

---

## 17. Ejercicios

Usa el array `users` de esta guía.

1. Crea un array que contenga solamente los nombres.
2. Encuentra al usuario cuyo `id` sea `3`.
3. Filtra los usuarios activos.
4. Comprueba si existe algún usuario de Londres.
5. Comprueba si todos los usuarios tienen nombre.
6. Calcula la suma de las edades.
7. Crea etiquetas con el formato `"Ada Lovelace — Programadora"`.
8. Ordena una copia de los usuarios por nombre.
9. Actualiza a `isActive: true` el usuario con id `2` sin modificar el array original.
10. Elimina al usuario con id `1` sin usar `splice`.

### Soluciones posibles

```js
const names = users.map(user => user.name);

const user3 = users.find(user => user.id === 3);

const activeUsers = users.filter(user => user.isActive);

const hasUserFromLondon = users.some(
  user => user.location === 'Londres'
);

const allHaveName = users.every(user => Boolean(user.name));

const totalAge = users.reduce(
  (total, user) => total + user.age,
  0
);

const labels = users.map(
  user => `${user.name} — ${user.role}`
);

const sortedUsers = users.toSorted((a, b) =>
  a.name.localeCompare(b.name)
);

const activatedUsers = users.map(user =>
  user.id === 2 ? { ...user, isActive: true } : user
);

const usersWithout1 = users.filter(user => user.id !== 1);
```

---

## 18. Hoja de referencia rápida

```js
// Variables
const fixedReference = 'valor';
let changingValue = 0;

// Objeto
const user = { id: 1, name: 'Ada' };
user.name;

// Array
const users = [user];
users[0];

// Funciones
function add(a, b) {
  return a + b;
}

const multiply = (a, b) => a * b;

// Métodos de array
users.forEach(user => console.log(user));
users.map(user => user.name);
users.find(user => user.id === 1);
users.filter(user => user.id > 0);
users.some(user => user.id === 1);
users.every(user => Boolean(user.name));
users.reduce((count, user) => count + 1, 0);

// Sintaxis moderna
const { id, name } = user;
const copy = { ...user };
const extended = [...users, anotherUser];
const city = user.address?.city ?? 'Sin ciudad';
const label = `${name} (#${id})`;
```

---

## 19. Orden de estudio recomendado

```text
variables y tipos
       ↓
condiciones y operadores
       ↓
objetos y arrays
       ↓
funciones y callbacks
       ↓
forEach, map, find y filter
       ↓
some, every y reduce
       ↓
desestructuración, spread, ?. y ??
       ↓
aplicación práctica con DOM
```

No intentes memorizar todos los métodos. Aprende a reconocer la pregunta que resuelve cada uno y practica con pequeños arrays de objetos.

---

## Fuentes y lecturas recomendadas

- [MDN: gramática y tipos de JavaScript](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Grammar_and_types)
- [MDN: trabajar con objetos](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Working_with_objects)
- [MDN: referencia de `Array`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [MDN: funciones en JavaScript](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Functions)
- [MDN: funciones flecha](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
- [JavaScript.info: funciones](https://es.javascript.info/function-basics)
- [JavaScript.info: métodos de arrays](https://javascript.info/array-methods)
- [JavaScript.info: objetos](https://javascript.info/object-basics)

