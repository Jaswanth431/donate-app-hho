const express = require('express');
const postsController = require('./../controllers/postsController');
const router = express.Router();

router.post('/', postsController.createPostHandler);
router.get('/:postid', postsController.getPostByTitleHandler);
router.get('/', postsController.getAllPostsHandler);



module.exports = router;