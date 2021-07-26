const { Schema, model } = require('mongoose');

const CarSchema = Schema(
  {
    car: {
      type: String,
      require: [true, 'El nombre del vehículo es obligatorio'],
      unique: true
    },
    brand: {
      type: String,
      require: [true, 'El marca del vehículo es obligatorio']
    },
    year: {
      type: Number,
      require: [true, 'El año del vehículo es obligatorio']
    },
    description: {
      type: String
    },
    sold: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = model('Car', CarSchema);
