// Create web server and listen for requests
// 1. get all comments
// 2. get comment by id
// 3. create a new comment
// 4. update a comment by id
// 5. delete a comment by id

const express = require('express');
const router = express.Router();
const { getComments, getCommentById, createComment, updateComment, deleteComment } = require('../controllers/comments');

// 1. get all comments
router.get('/', getComments);

// 2. get comment by id
router.get('/:id', getCommentById);

// 3. create a new comment
router.post('/', createComment);

// 4. update a comment by id
router.patch('/:id', updateComment);

// 5. delete a comment by id
router.delete('/:id', deleteComment);

module.exports = router;