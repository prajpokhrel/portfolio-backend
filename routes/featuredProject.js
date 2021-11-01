const express = require('express');
const router = express.Router();
const requireAuth = require('../middlewares/requireAuth');
const imageUpload = require('../middlewares/imageUpload');
const featuredController = require('../controllers/featuredController');

router.post('/:id', requireAuth, imageUpload.single('projectImage'), featuredController.addFeaturedProject);

router.get('/:id', requireAuth, featuredController.getFeaturedProject);

router.delete('/:id', requireAuth, featuredController.deleteFeaturedProject);

module.exports = router;