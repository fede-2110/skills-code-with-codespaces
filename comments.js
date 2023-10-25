// create web server with express
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Comment = require('./models/comment');
const app = express();

// connect to database
mongoose.connect('mongodb://localhost/comments');

// configure app
app.use(morgan('dev')); // log requests to the console
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 8080; // set our port

// ROUTES FOR OUR API
// =============================================================================
const router = express.Router(); // get an instance of the express Router

// middleware to use for all requests
router.use((req, res, next) => {
  // do logging
  console.log('Something is happening.');
  next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', (req, res) => {
  res.json({ message: 'hooray! welcome to our api!' });
});

// on routes that end in /comments
// ----------------------------------------------------
router
  .route('/comments')

  // create a comment (accessed at POST http://localhost:8080/comments)
  .post((req, res) => {
    const comment = new Comment(); // create a new instance of the Comment model
    comment.author = req.body.author;
    comment.text = req.body.text;

    // save the comment and check for errors
    comment.save((err) => {
      if (err) res.send(err);

      res.json({ message: 'Comment created!' });
    });
  })

  // get all the comments (accessed at GET http://localhost:8080/api/comments)
  .get((req, res) => {
    Comment.find((err, comments) => {
      if (err) res.send(err);

      res.json(comments);
    });
  });

// on routes that end in /comments/:comment_id
// ----------------------------------------------------
router
  .route('/comments/:comment_id')

  // get the comment with that id
  .get((req, res) => {
    Comment.findById(req.params.comment_id, (err, comment) => {
      if (err) res.send(err);

      res.json(comment);
    });
  })

  // update the comment with this id
  .put((req, res) => {
    Comment.findById