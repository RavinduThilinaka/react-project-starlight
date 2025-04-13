const express = require('express');
const app = express();
const cors = require('cors');
const controller = require('./controller');

app.use(cors());

app.use(
    express.urlencoded({
        extended:true,
    })
);

app.use(express.json());

app.get('/getPayment',(req,res) =>{
    var resObj = [];
    controller.getPayment((req,res) =>{
        res.send();
    });
});

app.post('/addPayment',(req,res) =>{
    controller.addPayment(req.body)
    .then(payments => res.json(payments))
    .catch(err => res.json(err))
});

app.put('/updatePayment/:id',(req,res) =>{
    controller.updatePayment(req.body,(callback) =>{
        res.send(callback)
    });
});

app.delete('/deletePayment/:id',(req,res) =>{
    controller.deletePayment(req.body,(callback) =>{
        res.send(callback)
    })
})

module.exports = app;