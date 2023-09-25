const mongoose = require("mongoose");

const bannerschema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    link:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        requiured:true,
    },
    desktopImage:{
        type:String,
        required:true,
    },
    mobileImage:{
        type:String,
        required:true,
    },
    created: {
        type: Date,
        default: Date.now
      }
});


const Banner = mongoose.model("Banner",bannerschema);

module.exports={
    Banner,
}