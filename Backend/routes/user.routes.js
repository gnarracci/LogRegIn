const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user.controller');

router.post('/register', userCtrl.regUsers);
router.post('/login', userCtrl.logUsers);

router.get('/', userCtrl.getUsers);
router.get('/:id', userCtrl.getUser);
router.put('/:id', userCtrl.editUser);
router.delete('/:id', userCtrl.delUser);

module.exports = router;