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

app.get('/getUsers',(req,res) =>{

    var resObj = [];
    controller.getUsers((req,res) =>{
        res.send();
    });
});

app.post('/signupUser',(req,res)=>{
    controller.signupUser(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err))
});

app.post('/updateUser/:id',(req,res) =>{
    controller.updateUser(req.body,(callback) =>{
        res.send(callback)
    });
});

app.post('/deleteUser/:id',(req,res) =>{
    controller.deleteUser(req.body,(callback =>{
        res.send(callback)
    }));
})

app.post('/login',(req,res) =>{
    controller.loginUser(req.body)
    .then(users =>res.json(users))
    .catch(err => res.json(err));
})

app.get("/",(req,res) =>{
    controller.verifyUser(req.body,(callback) =>{
        res.send(callback);
    })
})
module.exports = app;

