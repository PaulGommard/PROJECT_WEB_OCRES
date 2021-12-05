var express = require('express');
var router = express.Router();
const Profile = require('../controllers/profile.controller.js');

// Get all
router.get('/', Profile.findAll);

// Get one
router.get('/:name', Profile.findByLastName);


// Post one
router.post('/', Profile.saveOne);

router.delete('/:name', Profile.deleteByLastName);

// Update one
router.put('/:id', Profile.updateProfile);


module.exports = router;