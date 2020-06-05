const express = require('express');
const router = express.Router();
const handle = require('./handle');

router.get('/findUser', handle.findUser);
router.all('/findUserById', handle.findUserById);
router.all('/addUser', handle.addUser);
router.all('/deleteUserById', handle.deleteUserById);
router.all('/updateUser', handle.updateUser);
router.all('/login', handle.login);

module.exports = router;