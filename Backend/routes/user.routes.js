const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user.controller');

router.post('/', userCtrl.regUsers);
router.get('/', userCtrl.getUsers);
router.get('/:id', userCtrl.getUser);
router.put('/:id', userCtrl.editUser);




module.exports = router;