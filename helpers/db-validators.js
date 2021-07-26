const Car = require('../models/Car');

const existCar = async (car = '') => {
  const query = { car: car.toUpperCase() };
  const carExist = await Car.findOne(query);
  if (carExist) throw new Error(`El vehículo: ${carExist.car} ya esta en uso`);
};

const existId = async (id) => {
  const carId = await Car.findById(id);
  if (!carId) throw new Error(`El id ingresado: ${id}, no existe.`);
};

module.exports = {
  existCar,
  existId
};
