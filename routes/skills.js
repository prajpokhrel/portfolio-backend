const express = require('express');
const router = express.Router();
const requireAuth = require('../middlewares/requireAuth');
const skillsController = require('../controllers/skillsController');

router.post('/:id', requireAuth, skillsController.addSkills);

router.get('/:id', requireAuth, skillsController.getSkills);

router.patch('/:id', requireAuth, skillsController.updateSkills);

router.delete('/:id', requireAuth, skillsController.deleteSkills);

module.exports = router;