const express = require('express');
const router = express.Router();
const ctrl = require('./red.ctrl');

// main page
router.get('/', ctrl.index);

// read content for specific id
router.get('/:id', ctrl.show);

// create new content
router.post('/', ctrl.create);

// update content for specific id
router.put('/:id', ctrl.update);

// delete content for specific id
router.delete('/:id', ctrl.destroy);

module.exports = router;