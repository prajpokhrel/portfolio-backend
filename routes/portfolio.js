const express = require('express');
const router = express.Router();
const requireAuth = require('../middlewares/requireAuth');
const portfolioController = require('../controllers/portfolioController');

router.post('/', requireAuth, portfolioController.addPortfolio);

router.get('/', requireAuth, portfolioController.getPortfolio);

router.get('/:id', requireAuth, portfolioController.getUserPortfolioDetails);

router.delete('/:id', requireAuth, portfolioController.deletePortfolio);

module.exports = router;