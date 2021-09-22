# Clothesstore

Rest API en node.js la cual contiene dos servicios, uno para obtener los productos más buscados, y por otro lado un servicio para la creación de nuevos productos.

## ¿Cómo correr el proyecto?

Primero clonar el repositorio.

```bash
git clone https://github.com/juanesgutiz19/clothesstore.git
```

Dentro de la carpeta se ejecuta lo siguiente:

```bash
# Instalación de node_modules
npm i
```

El archivo .example.env debe ser reemplazado por el archivo .env, los valores de las variables de entorno deben ser pedidos al autor del presente código. Posteriormente se debe ejecutar lo siguiente:

```bash
npm start
```

Para ejecutar las pruebas se ejecuta el comando:

```bash
npm run test
```
## URL Producción de la REST API

La Rest API se puede probar a través de esta [URL](https://experimentality-clothesstore.herokuapp.com/api/products/).

## Documentación de la API

La documentación de la API puede ser accedida [aquí](https://documenter.getpostman.com/view/13549292/UUxujARN).

## Estructura de base de datos
Se hizo uso de MongoDB, y se crearon las colecciones productos, pictures y countries. Por un lado, el producto contiene información relevante del producto y además incluye un número de visitas, esto con el fin de poder filtrar los
productos más buscados. Además la colección products contiene una referencia a una imagen (picture), y pictures a su vez es otra colección la cual tiene como atributos urlFrontal y urlBack, los cuales contendrán las respectivas urls
de las imágenes, que estarán almacenadas en [Cloudinary](https://cloudinary.com/). Por último, se tiene una colección countries, que tiene como objetivo validar que cuando se cree un nuevo producto, el código del país, acorde con la
nomenclatura ISO 3166-1 se encuentre en la base de datos.

![alt text](https://res.cloudinary.com/dpfh4ci7h/image/upload/v1632298228/geoo02aifgqiy7imaghy.png)
