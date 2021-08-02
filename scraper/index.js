const mongoose = require('mongoose');
const Problem = require('./Problem');
require('dotenv').config();
const seed = require('./seed');

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });

    const check = await Problem.findOne({});
    if (!check) seed();
    process.exit(0);
  } catch (err) {
    console.log('Error: ' + err);
  }
})();
