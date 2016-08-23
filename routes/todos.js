var express = require('express');
var router = express.Router();
var Todo = require('../models/todo');

function makeError(res, message, status) {
  res.statusCode = status;
  var error = new Error(message);
  error.status = status;
  return error;
}

function authenticate(req, res, next) {
  if(!req.isAuthenticated()) {
    req.flash('error', 'Please signup or login.');
    res.redirect('/');
  }
  else {
    next();
  }
}

// INDEX
//?title(genre)=kfjdlsa
router.get('/', authenticate, function(req, res, next) {

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
    var todos = currentUser.todos
    res.render('todos/index', { todos: todos } );
  }, function(err) {
    return next(err);
  });
});

//Search
router.post('/search', authenticate, function(req, res, next) {
console.log(req.body.genre);

  var search = req.body.genre;
  res.redirect('/todos/?genre='+search);
});

//Get
router.get('/search', authenticate, function(req, res, next) {
  res.render('todos/search');
});

// NEW
router.get('/new', authenticate, function(req, res, next) {
  var todo = {
    title: '',
    genre: '',
    completed: false
  };
  res.render('todos/new', { todo: todo } );
});

// SHOW
router.get('/:id', authenticate, function(req, res, next) {
  Todo.findById(req.params.id)
  .then(function(todo) {
    var todo = currentUser.todos.id(req, res, next);
    if (!todo) return next(makeError(res, 'Document not found', 404));
    res.render('todos/show', { todo: todo });
  }, function(err) {
    return next(err);
  });
});

// CREATE
router.post('/', authenticate, function(req, res, next) {
  var todo = new Todo({
    title: req.body.title,
    genre: req.body.genre,
    completed: req.body.completed ? true : false
  });
  currentUser.todos.push(todo);
  currentUser.save()
  todo.save()
  .then(function(saved) {
    res.redirect('/todos');
  }, function(err) {
    return next(err);
  });
});

// EDIT
router.get('/:id/edit', authenticate, function(req, res, next) {
  console.log(todo);
  Todo.findById(req.params.id)
  .then(function(todo) {
    var todo = currentUser.todos.id(req.params.id);
    if (!todo) return next(makeError(res, 'Document not found', 404));
    res.render('todos/edit', { todo: todo });
  }, function(err) {
    return next(err);
  });
});

/*// Search Results
router.get('/search', function(req, res, next) {
  Todo.findById(req.params.id)
  .then(function(todo) {
    if (!todo) return next(makeError(res, 'Document not found', 404));
    res.redirect('/?' + string, { todo: todo });
  }, function(err) {
    return next(err);
  });
});
*/

// UPDATE
router.put('/:id', authenticate, function(req, res, next) {
  Todo.findById(req.params.id)
  .then(function(todo) {
    var todo = currentUser.todos.id(req.params.id);
    if (!todo) return next(makeError(res, 'Document not found', 404));
    else {
      todo.title = req.body.title;
      todo.genre = req.body.genre;
      todo.completed = req.body.completed ? true : false;
      //return todo.save();
      currentUser.save()
  //})
      .then(function(saved) {
        res.redirect('/todos');
      }, function(err) {
        return next(err);
      });
    }
  });
});

// DESTROY
router.delete('/:id', authenticate, function(req, res, next) {
    var todo = currentUser.todos.id(req.params.id);
    if (!todo) return next(makeError(res, 'Document not found', 404));
    var index = currentUser.todos.indexOf(todo);
    currentUser.todos.splice(index, 1);
    currentUser.save()
    .then(function(saved) {
      res.redirect('/todos');
    }, function(err) {
      return next(err);
  });
});

//   Todo.findByIdAndRemove(req.params.id)
//   .then(function() {
//     res.redirect('/todos');
//   }, function(err) {
//     return next(err);
//   });
// });

module.exports = router;






