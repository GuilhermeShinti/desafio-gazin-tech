const express = require('express');
const router = express.Router();
const NivelController = require('../controllers/nivelController');

router.get('/', NivelController.list);
router.post('/', NivelController.create);
router.put('/:id', NivelController.update);
router.delete('/:id', NivelController.remove);

module.exports = router;