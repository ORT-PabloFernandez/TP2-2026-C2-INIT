# Ejercicio 5: API REST con Express y persistencia en JSON

## Objetivo

Desarrollar una API REST basica para gestionar usuarios. La informacion se debe guardar en un archivo `data/usuarios.json` ubicado en la raiz del proyecto. Las contraseñas deben almacenarse hasheadas con `bcrypt`.

## Datos de cada usuario

Cada usuario debe tener al menos estos campos:

```json
{
  "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "username": "juanperez",
  "email": "juan@example.com",
  "password": "$2b$10$..."
}
```

- `id`: GUID (string) generado automaticamente.
- `username`: texto unico, obligatorio.
- `email`: texto, obligatorio.
- `password`: contraseña hasheada con bcrypt, nunca se guarda en texto plano.

## Tecnologias

- `express` para crear el servidor.
- `bcrypt` para hashear las contraseñas.
- `crypto.randomUUID()` de Node.js (nativo) o el paquete `uuid` para generar GUIDs.
- Modulo `fs` (sincrono) para leer y escribir el archivo JSON.
- Funciones inmutables (`map`, `filter`, `find`, `[...array].sort`, spread) para manipular los datos.

## Estructura del proyecto (en la raiz)

El proyecto debe estar directamente en `/home/dev/code/2026/tp2/c2/`, no dentro de ninguna subcarpeta adicional:

```
/home/dev/code/2026/tp2/c2/
  package.json
  app.js
  data/
    usuarios.json
  ejercicio5-crud-express.md
```

El archivo `data/usuarios.json` debe iniciar como un array vacio `[]`.

## Instalacion de dependencias

Inicializar el proyecto e instalar:

```bash
npm init -y
npm install express bcrypt
```

Si decidis usar el paquete `uuid` en lugar de `crypto.randomUUID()`, instalarlo tambien:

```bash
npm install uuid
```

## Endpoints requeridos

La API debe exponer los siguientes endpoints con Express:

| Metodo | Ruta              | Descripcion                           |
|--------|-------------------|---------------------------------------|
| GET    | `/usuarios`       | Listar todos los usuarios             |
| GET    | `/usuarios/:id`   | Obtener un usuario por su GUID        |
| POST   | `/usuarios`       | Crear un nuevo usuario                |
| PUT    | `/usuarios/:id`   | Actualizar un usuario existente       |
| DELETE | `/usuarios/:id`   | Eliminar un usuario                   |

### 1. Listar todos los usuarios

- **Metodo:** `GET`
- **Ruta:** `/usuarios`
- **Descripcion:** Devuelve la lista completa de usuarios.
- **Respuesta exitosa:**
  - Codigo: `200`
  - Body: array de usuarios sin el campo `password`
- **Ejemplo de respuesta:**
  ```json
  [
    { "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890", "username": "juanperez", "email": "juan@example.com" }
  ]
  ```

### 2. Obtener un usuario por id

- **Metodo:** `GET`
- **Ruta:** `/usuarios/:id`
- **Descripcion:** Devuelve un usuario segun su `id`.
- **Respuesta exitosa:**
  - Codigo: `200`
  - Body: usuario sin el campo `password`
- **Errores:**
  - Codigo: `404`
  - Body: `{ "error": "Usuario no encontrado" }`

### 3. Crear un usuario

- **Metodo:** `POST`
- **Ruta:** `/usuarios`
- **Descripcion:** Crea un nuevo usuario.
- **Body esperado:**
  ```json
  {
    "username": "juanperez",
    "email": "juan@example.com",
    "password": "secreto123"
  }
  ```
- **Validaciones:**
  - `username`, `email` y `password` son obligatorios.
  - El `username` no puede repetirse.
  - El `email` no puede repetirse.
- **Respuesta exitosa:**
  - Codigo: `201`
  - Body: usuario creado sin el campo `password`
- **Errores:**
  - Codigo: `400`
  - Body: `{ "error": "..." }`

### 4. Actualizar un usuario

- **Metodo:** `PUT`
- **Ruta:** `/usuarios/:id`
- **Descripcion:** Actualiza un usuario existente.
- **Body esperado (todos opcionales):**
  ```json
  {
    "username": "nuevousuario",
    "email": "nuevo@example.com",
    "password": "nuevaclave"
  }
  ```
- **Reglas:**
  - Si se envia `password`, se debe hashear antes de guardar.
  - Si se envia `username` o `email`, no deben coincidir con los de otro usuario.
- **Respuesta exitosa:**
  - Codigo: `200`
  - Body: usuario actualizado sin el campo `password`
- **Errores:**
  - Codigo: `404` si el usuario no existe.
  - Codigo: `400` si hay datos invalidos o duplicados.

### 5. Eliminar un usuario

- **Metodo:** `DELETE`
- **Ruta:** `/usuarios/:id`
- **Descripcion:** Elimina un usuario por su `id`.
- **Respuesta exitosa:**
  - Codigo: `200`
  - Body: `{ "mensaje": "Usuario eliminado" }`
- **Errores:**
  - Codigo: `404`
  - Body: `{ "error": "Usuario no encontrado" }`

## Firmas de funciones sugeridas

Implementa al menos estas funciones helper en `app.js` para mantener el codigo ordenado:

```js
// Lee el archivo data/usuarios.json y devuelve el array de usuarios
function readUsers() { }

// Escribe el array de usuarios en data/usuarios.json
function writeUsers(users) { }

// Genera un nuevo GUID para un usuario
function generateId() { }

// Hashea una contraseña con bcrypt
function hashPassword(password) { }

// Devuelve un nuevo objeto usuario sin el campo password
function omitPassword(user) { }
```

## Reglas de persistencia

- Leer el archivo `data/usuarios.json` con `fs.readFileSync` y `JSON.parse`.
- Escribir el archivo `data/usuarios.json` con `fs.writeFileSync` y `JSON.stringify(datos, null, 2)`.
- Cada operacion de escritura debe reflejar el estado actual del array de usuarios.

## Reglas de inmutabilidad

- No se debe modificar el array leido directamente.
- Usar `map`, `filter`, `find` y spread para crear nuevos arrays u objetos.
- Al ordenar o buscar, evitar mutar el array original.

## Reglas de seguridad

- Nunca devolver el campo `password` en las respuestas.
- Nunca almacenar la contraseña en texto plano.

## Servidor

- El servidor debe escuchar en el puerto `3000`.
- Al iniciar, mostrar en consola: `Servidor escuchando en http://localhost:3000`.

## Ejemplos de uso con curl

Crear un usuario:

```bash
curl -X POST http://localhost:3000/usuarios \
  -H "Content-Type: application/json" \
  -d '{"username":"juanperez","email":"juan@example.com","password":"secreto123"}'
```

Listar usuarios:

```bash
curl http://localhost:3000/usuarios
```

Obtener un usuario:

```bash
curl http://localhost:3000/usuarios/a1b2c3d4-e5f6-7890-abcd-ef1234567890
```

Actualizar un usuario:

```bash
curl -X PUT http://localhost:3000/usuarios/a1b2c3d4-e5f6-7890-abcd-ef1234567890 \
  -H "Content-Type: application/json" \
  -d '{"email":"juan.nuevo@example.com"}'
```

Eliminar un usuario:

```bash
curl -X DELETE http://localhost:3000/usuarios/a1b2c3d4-e5f6-7890-abcd-ef1234567890
```

## Entrega

El alumno debe entregar:

- El proyecto completo funcionando en la raiz del repositorio.
- El archivo `data/usuarios.json` con al menos 2 usuarios de prueba (con id en formato GUID).
- Captura o lista de peticiones de prueba realizadas (pueden usar curl, Postman, Thunder Client, etc.).
