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

    const {id} = req.params;
    const {name,email,age,password,role} = req.body;
    const ObjectId = require('mongodb').ObjectId;

    User.updateOne({_id:new ObjectId(id)}, { $set: { name, email, age, password, role }})
    
    .then(response =>{
        res.json({ message: "User updated successfully" });
    })
    .catch(error =>{
        res.json({ error: "Error updating user" })
    })
}

/////////////////////////////////////////////////////////////////////////////////////

const deleteUser = (req, res) => {
    const { id } = req.params; // Get user ID from URL parameters
    const ObjectId = require('mongodb').ObjectId;

    User.deleteOne({ _id: new ObjectId(id) })
        .then(response => {
            if (response.deletedCount > 0) {
                res.json({ message: "User deleted successfully" });
            } else {
                res.status(404).json({ error: "User not found" });
            }
        })
        .catch(error => {
            res.status(500).json({ error: "Error deleting user", details: error.message });
        });
};

/////////////////////////////////////////////////////////////////////////////////////

const loginUser = (req,res) =>{
    const {email,password} = req.body;
    User.findOne({email})

    .then(user =>{
        if(!user){
            return res.status(404).json({message:"Incorrect email or password"})
        }
        bcrypt.compare(password,user.password,(error,response) =>{
            if(user){
                if(response){
                    const token = jwt.sign({email:user.email,role:user.role,name:user.name,age:user.age} , "jwt-secret-key",{expiresIn:"1d"});
                    res.cookie("token" , token,{
                        httpOnly:true,
                        secure:false,
                        sameSite:'Lax',
                    });

                    return res.json({message:"Success",role:user.role,name:user.name,email:user.email,age:user.age})
                }else{
                    return res.status(400).json({message:"Password is incorrect"});
                }
            }else{
                res.json("No record existed")
            }
        })
    })
}

//////////////////////////////////////////////////////////////////////////////////////
const verifyUser = (req,res,next) =>{
    const token = req.cookies.token;

    if(!token){
        return res.json("Toke was not available")
    }else{
        jwt.verify(token,"jwt-secret-key", (error,decoded) =>{
            if(error)
                return res.json("Token is wrong")
            next();
        })
    }

    return res.json("Success")
}

exports.signupUser = signupUser;
exports.getUsers = getUsers;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.verifyUser = verifyUser;
exports.loginUser = loginUser;