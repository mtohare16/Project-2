var mongoose = require('mongoose');
var Todo = require('./models/todo');

mongoose.connect('mongodb://localhost/todos');

function quit() {
  mongoose.disconnect();
  console.log('\nQuitting!');
}

function handleError(err) {
  console.log('ERROR:', err);
  quit();
  return err;
}

console.log('removing old todos...');
Todo.remove({})
.then(function() {
  console.log('old todos removed');
  console.log('creating some new todos...');
  var tdk = new Todo({ title: 'The Dark Knight', completed: false });
  var spr = new Todo({ title: 'Saving Private Ryan', completed: true });
  return Todo.create([tdk, spr]);
})
.then(function(allTodos) {
  console.log('Just saved', savedTodos.length, 'todos.');
  return Todo.find({});
})

.then(function(allTodos) {
  console.log('Printing all todos:');
  allTodos.forEach(function(todo) {
    console.log(todo);
  });
  return Todo.findOne({title: 'tdk'});
})

.then(function(tdk) {
  tdk.completed = true;
  return tdk.save();
})

.then(function(tdk) {
  console.log('updated The Dark Knight:', tdk);
  return tdk.remove();
})
.then(function(deleted) {
  return Todo.find({});
})
.then(function(allTodos) {
  console.log('Printing all todos:');
  allTodos.forEach(function(todo) {
    console.log(todo);
  });
  quit();
});







