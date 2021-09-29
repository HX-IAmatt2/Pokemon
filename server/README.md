# Pokemon-Server 

## Link a deploy:
  https://pokemon-client.web.app/

  
> Api-Rest Server de la app Pokemon. Realizado utilizando NodeJS, Express, Sequelize y PostgreSQL.

## Iniciando el servidor
- Posee un loader que se encarga de obtener todos los `types` de la Api externa "Pokemon".
- También otro loader que trae una lista de Pokemons según la cantidad que fijemos en el archivo `config.js`
- Para cada Pokemon de esta lista, se realiza un `subrequest` para obtener su información detallada. 
- En cada uno de ellos también se le asignan sus `types` quedando así los modelos de tablas relacionados.

## Rutas / Endpoints
- El endpoint principal `/pokemons` devuelve una lista con la información básica de cada Pokemon necesaria para mostrar y ordenar las tarjetas del componente Home del frontend.
- Posee rutas para obtener información detallada de un Pokemon específico ya se por nombre como por ID.
- También hay una ruta destinada de devolver una lista de todos los types existentes. Esta se utiliza en el front end para generar los inputs 'Select' para el filtrado en home, y en los inputs del formulario del Pokelab, por ejemplo.
- Tenemos la ruta de creación, que responde al `POST` request donde el recibimos desde del frontend los datos de un Pokemon creado por el usuario. Aquí se crea un nuevo registro en la tabla de Pokemons, asignandole al mismo una ruta de imagen random y seteandole en `custom` una propiedad que define su característica de no-original. De esta forma en el frontend podemos filtrar y diferenciar Pokemons originales y creados.
- La ruta de `rename` es donde recibimos los request de tipo `PUT`, es decir que hacen un `UPDATE` de un registro. En este caso le cambiamos el nombre a un Pokemon. 
- Por último tenemos la ruta `delete` donde elimamos de la DB el Pokemon que nos indican.