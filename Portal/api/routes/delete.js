const express = require('express');
const router = express.Router();

const deleteController = require('../controllers/delete');

//route handles a delete profile request
router.get('/', deleteController.delete_profile);

module.exports = router;