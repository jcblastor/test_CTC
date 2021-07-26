const Car = require('../models/Car');

const findCars = async (search, ...others) => {
  const regex = new RegExp(search, 'i');

  const cars = await Car.find({
    $or: [{ car: regex }, { brand: regex }, { description: regex }],
    $and: [...others]
  });

  return cars;
};

module.exports = {
  findCars
};
