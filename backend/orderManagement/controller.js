const { json } = require("express");
const {response} = require("./app");
const Order = require("./model");

const getOrder = (req,res,next) =>{
    Order.find()
    .then(response =>{
        res.json({response})
    })
    .catch(error =>{
        res.json({error})
    })
};

///////////////////////////////////////
const addOrder = (req,res,next) =>{
    const order = new Order({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        mobileNumber:req.body.mobileNumber,
        country:req.body.country,
        address:req.body.address,
        city:req.body.cityj,
        zipCode:req.body.zipCode
    });

    order.save()

    .then(response =>{
        res.json({response})
    })
    .catch(error =>{
        res.json({error})
    })
}

///////////////////////////////////////////////
const  updateOrder = (req,res,next) =>{
    const {id} = req.params;
    const {firstName,lastName,mobileNumber,country,address,city,zipCode} = req.body;
    const ObjectId = require('mongodb').ObjectId;

    Order.updateOne({_id:new ObjectId(id)}, {$set:{firstName,lastName,mobileNumber,country,address,city,zipCode}})

    .then(response =>{
        res.json({message:"order updated succesfull"});
    })

    .catch(error =>{
        res.json({error:"error order updated"})
    })
}

////////////////////////////////////////////////
const deleteOrder = (req,res) =>{
    const {id} = req.params;
    const ObjectId = require('mongodb').ObjectId;

    Order.deleteOne({_id:new ObjectId(id)})
    .then(response =>{
        if(response.deletedCount > 0){
            res.json({message:"order delete succesfull"});
        }else{
            res.status(404).json({error:"order not found"});
        }
    })

    .catch(error =>{
        res.status(500).json({error:"error deleting order",details:error.message});
    });
};

exports.getOrder = getOrder;
exports.addOrder = addOrder;
exports.updateOrder = updateOrder;
exports.deleteOrder = deleteOrder;
