// routes/api/books.js

const express = require('express');
const router = express.Router();

// Load Book model
const Emp = require('../../models/Employee');

// @route GET api/books/test
// @description tests books route
// @access Public
router.get('/test', (req, res) => res.send('book route testing!'));

// @route GET api/books/:id
// @description Get single book by id
// @access Public
router.get('/:employeeId', (req, res) => {
  Emp.findById(req.params.employeeId)
    .then(book => res.json(book))
    .catch(err => res.status(404).json({ nobookfound: 'No Book found' }));
});

// @route GET api/books/:id
// @description Update book
// @access Public
router.put('/:employeeId', (req, res) => {
  Emp.findByIdAndUpdate(req.params.employeeId, req.body)
    .then(book => res.json({ msg: 'Updated successfully' }))
    .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );
});

module.exports = router;
