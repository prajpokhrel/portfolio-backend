const express = require('express');
const router = express.Router();
const requireAuth = require('../middlewares/requireAuth');
const imageUpload = require('../middlewares/imageUpload');
const personalController = require('../controllers/personalController');

router.post('/:id', requireAuth, imageUpload.single('profileImage'), personalController.addPersonalInfo);

router.get('/:id', requireAuth, personalController.getPersonalInfo);

router.patch('/:id', requireAuth, imageUpload.single('profileImage'), personalController.updatePersonalInfo);

router.delete('/:id', requireAuth, personalController.deletePersonalInfo);

module.exports = router;