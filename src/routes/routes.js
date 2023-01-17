const express = require('express');
const controllers=require('../controllers/controller');

const router = express.Router();

// GET - /api/users?since={number}
// This endpoint must return a list of GitHub users and the link for the next page.
router.get('/users', controllers.getAllUsers)

// GET - /api/users/:username/details
// This endpoint must return the details of a GitHub user
router.get('/users/:username/details', controllers.getUser)

// GET - /api/users/:username/repos
// This endpoint must return a list with all user repositories
router.get('/users/:username/repos', controllers.getUserRepos)


module.exports = router;