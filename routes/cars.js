const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields');
const { existId, existCar } = require('../helpers/db-validators');

const {
  getAllCars,
  getCarById,
  searchCar,
  createCar,
  carUpdate,
  removeCar
} = require('../controllers/car');

const router = Router();

router.get('/', getAllCars);

router.get(
  '/:id',
  [
    check('id', 'El Id ingresado no es valido').isMongoId().custom(existId),
    validateFields
  ],
  getCarById
);

router.get(
  '/find/:search',
  [check('search', 'El parametro de busqueda es obligatorio').notEmpty(), validateFields],
  searchCar
);

router.post(
  '/',
  [
    check('car', 'El nombre del vehículo es obligatorio')
      .not()
      .isEmpty()
      .custom(existCar),
    check('brand', 'La marca del vehículo es obligatorio').not().isEmpty(),
    check('year', 'Ingrese el año del vehículo expresado en numeros').isNumeric(),
    validateFields
  ],
  createCar
);

router.put(
  '/:id',
  [
    check('id', 'El Id ingresado no es valido').isMongoId().custom(existId),
    validateFields
  ],
  carUpdate
);

router.delete(
  '/:id',
  [
    check('id', 'El Id ingresado no es valido').isMongoId().custom(existId),
    validateFields
  ],
  removeCar
);

module.exports = router;
