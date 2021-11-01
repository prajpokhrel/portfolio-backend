const express = require('express');
const router = express.Router();
const requireAuth = require('../middlewares/requireAuth');
const backgroundController = require('../controllers/backgroundController');

router.post('/:id', requireAuth, backgroundController.addBackgroundInfo);

router.get('/:id', requireAuth, backgroundController.getBackgroundInfo);

router.patch('/:id', requireAuth, backgroundController.updateBackgroundInfo);

router.delete('/:id', requireAuth, backgroundController.deleteBackgroundInfo);

module.exports = router;