var mongoose = require('mongoose');
var Todo = require('./models/todo');

mongoose.connect('mongodb://localhost.todos');

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
  var groceries = new Todo({ title: 'groceries', completed: false });
  var feedTheCat = new Todo({ title: 'feed the cat', completed: true });
  return Todo.create([groceries, feedTheCat]);
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
  return Todo.findOne({title: 'groceries'});
})

.then(function(groceries) {
  groceries.completed = true;
  return groceries.save();
})

.then(function(groceries) {
  console.log('updated grocereis:', groceries);
  return groceries.remove();
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







