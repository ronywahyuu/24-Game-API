const controller = require('../controllers/controller');
const router = require('express').Router();

router.get('/game', controller.resolveProblem);

module.exports = router;