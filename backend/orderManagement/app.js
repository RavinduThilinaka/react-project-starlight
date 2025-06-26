const express =require('express');
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

app.get('/getOrder',(req,res) =>{
    var resObj = [];
    controller.getOrder((req,res) =>{
        res.send();
    });
});

app.post('/addOrder',(req,res) =>{
    controller.addOrder(req.body)
    .then(order =>res.json(order))
    .catch(err =>res.json(err))
});

app.put('/updateOrder/:id',(req,res) =>{
    controller.updateOrder(req.body,(callback) =>{
        res.send(callback)
    });
});

app.delete('/deleteOrder/:id',(req,res) =>{
    controller.deleteOrder(req.body,(callback) =>{
        res.send(callback)
    });
});

module.exports = app;