# Data Warehouse

Este proyecto plantea la creación de un sistema de pedidos online para un restaurante. Deberás poner en funcionamiento las partes necesarias para montar una REST API que permita realizar altas, bajas, modificaciones y obtención de información sobre una estructura de datos que podría consumir un cliente. 

## Instalacion

### Requisitos

- Se debe contar acceso a una base de datos mysql.

### Instrucciones

- Instalar las dependencias ejecutando `npm install`
- Crear un archivo `.env` en la raíz del proyecto con las variables de entorno siguiendo el ejemplo existente en `.env.example`.
- Iniciar la aplicación ejecutando `npm run start`.



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

# Entorno de desarrollo. Completar con 'development' o 'production'.
# El entorno development fuerza una sincronizacion de la base de datos.
NODE_ENV=development

# Si esta en true y el entorno es de 'development' entonces carga
# las tablas con datos de ejemplo.
POPULATE_DB=true

# Puerto donde correra la aplicacion
PORT=4000
```

## Documentacion

La documentación de la API puede encontrarse en los archivos `api-documentation.yaml` y `api-documentation.html` presentes en el directorio raíz del repositorio.



### Resumen
La url base es `{host}/api`

La aplicación cuenta con los siguientes endpoints:
- `/auth/login`
- `/auth/register`
- `/pedidos`
- `/pedidos/:pedidoId`
- `/productos`
- `/productos/:productoId`
- `/usuarios`
- `/usuarios/:usuarioId`
- `/usuarios/:usuarioId/favoritos`
- `/usuarios/:usuarioId/favoritos/:productoId`

Todos los enpoints cuentan con un crud con las siguientes funciones en el controller:
- `.create`, 
- `.readAll`,
- `.readOne`,
- `.delete`,
- `.update`

`.readOne`, `.delete` y `.update` requieren que se pase el :id como parámetro en la url.

`.create` y `.readAll` no reciben parámetros en la url.

`.readAll` recibe parametros query con los siguientes criterios:
  - Se puede filtrar por cada campo. Si el campo es texto entonces filtra por `like %query%`, si no es texto entonces filtra por exactitud.
  - Los campos numericos y de fecha admiten maximos y minimos, por ejemplo: minPrecio, maxPrecio.
  - Por defecto no tiene limites pero acepta los parametros limit y offset.