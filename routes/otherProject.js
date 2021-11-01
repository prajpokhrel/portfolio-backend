const express = require('express');
const router = express.Router();
const requireAuth = require('../middlewares/requireAuth');
const otherController = require('../controllers/otherController');

router.post('/:id', requireAuth, otherController.addOtherProject);

router.get('/:id', requireAuth, otherController.getOtherProject);

router.delete('/:id', requireAuth, otherController.deleteOtherProject);

module.exports = router;