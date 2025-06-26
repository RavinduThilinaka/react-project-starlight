const express = require('express');
const router = express.Router();
const controller =require('./controller');
const {routes} = require('./app');

router.post('/addOrder',controller.addOrder);
router.get('/getOrder',controller.getOrder);
router.put('/updateOrder/:id',controller.updateOrder);
router.delete('/deleteOrder/:id',controller.deleteOrder);

module.exports = router;