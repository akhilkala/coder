const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  link: {
    type: String,
  },
});

module.exports = mongoose.model('Problem', problemSchema);
