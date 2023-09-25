const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const {  } = require("../function/function");

const userschema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    mail:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,

    }
},{
    timestamps : true
}
);

    const User = mongoose.model("User", userschema);

const authschema = Joi.object({
    name:Joi.string().min(3).required(),
    mail:Joi.string().min(5).required().email(),
    password:Joi.string().min(8).required()

});


module.exports={
    authschema,
    User,
};