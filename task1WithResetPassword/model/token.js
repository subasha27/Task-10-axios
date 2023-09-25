const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
    token: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 36000,
    },
});

const Token =  mongoose.model("Token", tokenSchema);
module.exports={
    Token
}