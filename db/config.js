const mongoose = require('mongoose');

const dbConection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });

    console.log('database connected');
  } catch (err) {
    console.log(err);
    throw new Error('Error al conectarse a la base de datos');
  }
};

module.exports = {
  dbConection
};
