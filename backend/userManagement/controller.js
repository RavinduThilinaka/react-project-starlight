const User = require('./model');
const bcrypt = require('bcrypt');
const { response } = require('express');
const jwt = require('jsonwebtoken');

const signupUser = (req,res)=>{
    const {name,email,age,password,role} = req.body;

    bcrypt.hash(password,10)

        .then(hash =>{

            const user = new User({name,email,age,password:hash,role})
            user.save()

            .then(response =>{
                res.json({response})
            })

            .catch(error =>{
                res.json({error})
            }).catch(error => console.log(error.message))
        })

}

////////////////////////////////////////////////////////////////////////////////////
const getUsers = (req,res) =>{
    User.find()
    .then(response =>{
        res.json({response})
    })

    .catch(error =>{
        res.json({error})
    })
};

////////////////////////////////////////////////////////////////////////////////////

const updateUser = (req,res,next) =>{
    const {name,email,age,password,role} = req.body;
    User.updateOne({$set:{name:name,email:email,age:age,password:password,role:role}})

    .then(response =>{
        res.json({response})
    })
    .catch(error =>{
        res.json({error})
    })
}

/////////////////////////////////////////////////////////////////////////////////////

const deleteUser = (req,res) =>{

    const userId = req.body.userId;
    User.deleteOne({userId:userId})

    const ObjectId = require('mongodb').ObjectId;
    User.deleteOne({ _id: new ObjectId(userId) })
    .then(response =>{
        res.json({response})
    })

    .catch(error =>{
        res.json({error})
    })
}
/////////////////////////////////////////////////////////////////////////////////////
exports.signupUser = signupUser;
exports.getUsers = getUsers;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;