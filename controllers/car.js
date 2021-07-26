const { request, response } = require('express');

const { findCars } = require('../helpers/findCars');
const Car = require('../models/Car');

// buscar todos los autos, recibe 2 parametros opcionales
const getAllCars = async (req = request, res = response) => {
  const { limit = 10, from = 0 } = req.query;

  const [total, cars] = await Promise.all([
    Car.countDocuments(),
    Car.find().skip(Number(from)).limit(Number(limit))
  ]);

  return res.json({ total, cars });
};

// buscar un vehiculo por ID
const getCarById = async (req = request, res = response) => {
  const { id } = req.params;

  const car = await Car.findById(id);
  if (!car) return res.json({ msg: 'el vehículo que buscas no existe' });

  return res.json(car);
};

// buscar vehículo por parametro tiene 2 parametros opcionales
const searchCar = async (req = request, res = response) => {
  const { search } = req.params;
  const { sold, year } = req.query;

  // query opcional por año o por autos vendidos
  if (sold || year) {
    // eslint-disable-next-line no-unneeded-ternary
    const searchSold = { sold: sold === 'yes' ? true : false };
    const searchYear = { year: Number(year) };

    if (sold && year) {
      const result = await findCars(search, searchSold, searchYear);
      return res.json({ results: result });
    }

    if (sold) {
      const result = await findCars(search, searchSold);
      return res.json({ results: result });
    }

    if (year) {
      const result = await findCars(search, searchYear);
      return res.json({ results: result });
    }
  }

  // busca dentro de: vehiculo, modelo y descripcion
  const regex = new RegExp(search, 'i');
  const cars = await Car.find({
    $or: [{ car: regex }, { brand: regex }, { description: regex }]
  });

  return res.json({ results: cars });
};

// crear un nuevo vehiculo, verifica que no existan 2 con el mismo nombre
const createCar = async (req = request, res = response) => {
  const { car, brand, year, description } = req.body;

  const data = {
    car: car.trim().toUpperCase(),
    brand: brand.trim().toUpperCase(),
    year: Number(year),
    description
  };

  const newCar = new Car(data);
  await newCar.save();

  return res.status(201).json(newCar);
};

// actualizar un vehículo
const carUpdate = async (req = request, res = response) => {
  const { id } = req.params;
  const { _id, ...data } = req.body;

  if (data.brand) data.brand = data.brand.trim().toUpperCase();
  if (data.car) data.car = data.car.trim().toUpperCase();

  const carName = await Car.findOne({ car: data.car });

  if (carName) {
    if (id !== carName.id) {
      return res.json({ msg: `El vehículo: ${data.car} ya existe` });
    }
  }

  const newCar = await Car.findByIdAndUpdate(id, data, { new: true });
  return res.json(newCar);
};

// eliminar vehículo por Id
const removeCar = async (req = request, res = response) => {
  const { id } = req.params;

  const car = await Car.findById(id);

  if (!car)
    return res.json({
      msg: 'El vehículo que intentas eliminar no existe'
    });

  await Car.findByIdAndDelete(id);
  return res.json({ msg: `El vehículo: ${car.car} fue eliminado de la DB` });
};

module.exports = {
  getAllCars,
  getCarById,
  searchCar,
  createCar,
  carUpdate,
  removeCar
};
