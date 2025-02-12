const express = require('express');
const router = express.Router();
const controller = require("./controller");
const {routes} = require('./app');


router.post('/signupUser',controller.signupUser);
router.get('/getUsers',controller.getUsers);
router.post('/updateUser/:id',controller.updateUser);
router.delete('/deleteUser/:id',controller.deleteUser);
router.post('/login',controller.loginUser);
router.get("/App",controller.verifyUser);

module.exports = router