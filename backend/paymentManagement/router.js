const express = require('express');
const router = express.Router();
const controller = require('./controller');
const {routes} = require('./app');

router.post('/addPayment',controller.addPayment);
router.get('/getPayment',controller.getPayment);
router.put('/updatePayment/:id',controller.updatePayment);
router.delete('/deletePayment/:id',controller.deletePayment);

module.exports = router