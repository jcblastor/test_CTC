# TEST NODE CTC

## _Api rest para el curso Tecnologico Catamarca_

![Tecnologico Catamarca](https://scontent.faep37-1.fna.fbcdn.net/v/t1.6435-9/34142134_1969329150063398_4400807767053434880_n.png?_nc_cat=100&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=u4imxw-IOl0AX8uLdHn&_nc_ht=scontent.faep37-1.fna&oh=9bc2364716f97e0bcad049541773a5c9&oe=6123ABB4)

## Link en producción

### [Heroku](https://test-tecnologico.herokuapp.com/)

### Proyecto realizado en Node.js | express.js | mongoDB

## Installation

```sh
npm install
```

## end points

_Devuelve todos los vehículos, tiene dos parametros opcinales (limit y from)_

```sh
GET /api/cars
GET /api/cars?limit=10
GET /api/cars?from=2
GET /api/cars?limit=10&from=2
```

_Devuelve el vehículo por ID_

```sh
GET /api/cars/:id
```

_Devuelve La busqueda de vehiculos por un parametro de busqueda, tiene dos parametros opcionales (year y sold)_

```sh
GET api/cars/find/:search
GET api/cars/find/:search?sold=yes
GET api/cars/find/:search?year=2015
GET api/cars/find/:search?sold=no&year=2020
```

_Crea un vehículo nuevo_

```sh
POST /api/cars/
```

_Actualiza el vehículo por ID_

```sh
PUT /api/cars/:id
```

_Elimina el vehículo por ID_

```sh
DELETE /api/cars/:id
```
