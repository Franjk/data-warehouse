# Data Warehouse

Este proyecto plantea la creación de una herramienta que permita a una compañía de Marketing administrar todos los contactos de sus clientes para sus campañas.

Se trata de un sitio web que permita realizar operaciones CRUD a una base de datos de contactos que incluyen sus datos personales, sus preferencias, datos de contacto, lugar donde trabajan, y lugar donde viven.

## Instalacion

### Requisitos

- Se debe contar acceso a una base de datos mysql.

### Instrucciones

- Instalar las dependencias ejecutando `npm install`
- Crear un archivo `.env` en la raíz del proyecto con las variables de entorno siguiendo el ejemplo existente en `.env.example`.
- Iniciar la aplicación backend ejecutando `npm run start-backend`.
- Iniciar la aplicación frontend ejecutando `npm run start-frontend`.


### Ejemplo de configuracion del archivo `.env`

```
# Secreto del JWT a utilizar, puede ser cualquier string
JWT_SECRET=your_jwt_secret

# Nombre de la base de datos
DB_DATABASE=delilah_resto

# Nombre de usuario de la base de datos
DB_USERNAME=your_username

# Contraseña de la base de datos
DB_PASSWORD=your_password

# Host donde corre la base de datos
DB_HOST=localhost

# Entorno de desarrollo. Completar con 'development' o 'production'
# El entorno development fuerza una sincronizacion de la base de datos
NODE_ENV=development

# Si esta en true y el entorno es de 'development' entonces carga
# las tablas con datos de ejemplo.
POPULATE_DB=true

# Determina si resincroniza la base de datos
SYNC_DB=true

# Puerto donde correrá la aplicacion
PORT=4000
```
