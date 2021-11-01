const express = require('express');
const router = express.Router();
const requireAuth = require('../middlewares/requireAuth');
const experienceController = require('../controllers/experienceController');

router.post('/:id', requireAuth, experienceController.addExperience);

router.get('/:id', requireAuth, experienceController.getExperience);

router.delete('/:id', requireAuth, experienceController.deleteExperience);

module.exports = router;