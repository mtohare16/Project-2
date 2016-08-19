var express = require('express');
var router = express.Router();
var Todo = require('../models/todo');

function makeError(res, message, status) {
  res.statusCode = status;
  var error = new Error(message);
  error.status = status;
  return error;
}

// INDEX
//?title(genre)=kfjdlsa
router.get('/', function(req, res, next) {
  var todoFilter = {};

  if (req.query.title) {
    todoFilter.title = req.query.title;
  }

  if (req.query.genre) {
    todoFilter.genre = req.query.genre;
  }

  if (req.query.completed) {
    todoFilter.completed = req.query.completed;
  }

  console.log('todoFilter:', todoFilter);
  // get all the todos and render the index view
  Todo.find(todoFilter)
  .then(function(todos) {
    res.render('todos/index', { todos: todos } );
  }, function(err) {
    return next(err);
  });
});

// NEW
router.get('/new', function(req, res, next) {
  var todo = {
    title: '',
    //genre: '',
    completed: false
  };
  res.render('todos/new', { todo: todo } );
});

// SHOW
router.get('/:id', function(req, res, next) {
  Todo.findById(req.params.id)
  .then(function(todo) {
    if (!todo) return next(makeError(res, 'Document not found', 404));
    res.render('todos/show', { todo: todo });
  }, function(err) {
    return next(err);
  });
});

// CREATE
router.post('/', function(req, res, next) {
  var todo = new Todo({
    title: req.body.title,
    completed: req.body.completed ? true : false
  });
  todo.save()
  .then(function(saved) {
    res.redirect('/todos');
  }, function(err) {
    return next(err);
  });
});

// EDIT
router.get('/:id/edit', function(req, res, next) {
  Todo.findById(req.params.id)
  .then(function(todo) {
    if (!todo) return next(makeError(res, 'Document not found', 404));
    res.render('todos/edit', { todo: todo });
  }, function(err) {
    return next(err);
  });
});

// UPDATE
router.put('/:id', function(req, res, next) {
  Todo.findById(req.params.id)
  .then(function(todo) {
    if (!todo) return next(makeError(res, 'Document not found', 404));
    todo.title = req.body.title;
    todo.completed = req.body.completed ? true : false;
    return todo.save();
  })
  .then(function(saved) {
    res.redirect('/todos');
  }, function(err) {
    return next(err);
  });
});

// DESTROY
router.delete('/:id', function(req, res, next) {
  Todo.findByIdAndRemove(req.params.id)
  .then(function() {
    res.redirect('/todos');
  }, function(err) {
    return next(err);
  });
});

module.exports = router;






