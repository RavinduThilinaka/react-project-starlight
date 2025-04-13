const {response} = require('./app');
const Payment = require('./model');

const getPayment = (req,res,next) =>{
    Payment.find()
    .then(response => {
        res.json({response})
    })
    .catch(error => {
        res.json({error})
    })
};

/////////////////////////////////////////////
const addPayment = (req,res,next) =>{
    const payment = new Payment({
        cardNumber:req.body.cardNumber,
        holderName:req.body.holderName,
        expDate:req.body.expDate,
        cvv:req.body.cvv,
    });

    payment.save()

    .then(response=>{
        res.json({response})
    })
    .catch(error=>{
        res.json({error})
    })
}

////////////////////////////////////////////

const updatePayment = (req,res,next) =>{
    const {id} = req.params;
    const {cardNumber,holderName,expDate,cvv} = req.body;
    const ObjectId = require('mongodb').ObjectId;

    Payment.updateOne({_id:new ObjectId(id)} , {$set: {cardNumber,holderName,expDate,cvv}})

    .then(response=>{
        res.json({message: "Payment update Successfully"});

    })

    .catch(error=>{
        res.json({error:"Error payment update"})
    })
}

///////////////////////////////////////////////////

const deletePayment = (req,res) =>{
    const {id} = req.params;
    const ObjectId = require('mongodb').ObjectId;
    
    Payment.deleteOne({_id:new ObjectId(id)})
    .then(response =>{
        if(response.deletedCount > 0){
            res.json({message:"Payment deleted successfully"});
        }else{
            res.status(404).json({error:"Payment Not found"});
        }
    })

    .catch(error =>{
        res.status(500).json({error:"Error deleting payment",details:error.message});
    });
};

exports.getPayment = getPayment;
exports.addPayment = addPayment;
exports.updatePayment = updatePayment;
exports.deletePayment = deletePayment;