const express = require('express');
const cors = require('cors');

const { dbConection } = require('../db/config');

const CARS = require('../routes/cars');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.dbConection = dbConection;
    this.paths = {
      cars: '/api/cars'
    };

    // conectar a la DB
    this.conectarDB();

    // llamar los middlewears
    this.middlewears();

    // llamar las rutas
    this.routers();
  }

  // crear la conexion
  async conectarDB() {
    await this.dbConection();
  }

  // crear middlewears
  middlewears() {
    // agregar cors
    this.app.use(cors());
    // agregar lectura y parseo
    this.app.use(express.json());
  }

  // crear las rutas
  routers() {
    this.app.use(this.paths.cars, CARS);
  }

  // arrancar el servidor
  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port: ${this.port}`);
    });
  }
}

module.exports = Server;
