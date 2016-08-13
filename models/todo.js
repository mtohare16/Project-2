var mongoose = require('mongoose');

var TodoSchema = new mongoose.Schema ({
  title: { type: String, required: true },
  completed: { type: Boolean, required: true }
});

module.exports = mongoose.model('Todo', TodoSchema);

