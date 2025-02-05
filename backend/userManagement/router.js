const express = require('express');
const router = express.Router();
const controller = require("./controller");
const {routes} = require('./app');


router.post('/signupUser',controller.signupUser);
router.get('/getUsers',controller.getUsers);
router.post('/updateUser',controller.updateUser);
router.post('/deleteUser',controller.deleteUser);
module.exports = router