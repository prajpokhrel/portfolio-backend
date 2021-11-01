const express = require('express');
const router = express.Router();
const requireAuth = require('../middlewares/requireAuth');
const contactController = require('../controllers/contactController');

router.post('/:id', requireAuth, contactController.addContactInfo);

router.get('/:id', requireAuth, contactController.getContactInfo);

router.patch('/:id', requireAuth, contactController.updateContactInfo);

router.delete('/:id', requireAuth, contactController.deleteContactInfo);

module.exports = router;