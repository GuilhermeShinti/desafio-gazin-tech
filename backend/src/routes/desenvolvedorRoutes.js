const express = require('express');
const router = express.Router();
const DesenvolvedorController = require('../controllers/desenvolvedorController');

router.get('/', DesenvolvedorController.list);
router.post('/', DesenvolvedorController.create);
router.put('/:id', DesenvolvedorController.update);
router.delete('/:id', DesenvolvedorController.remove);

module.exports = router;