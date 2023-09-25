const mongoose = require("mongoose")
const { authschema, User } = require("../model/model")
const router = require("../router/route");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Token } = require("../model/token");
const sendEmail = require("../utils/sendEmail");
const Joi = require("@hapi/joi");
const crypto = require("crypto");
const dotenv = require('dotenv').config()

const signUp = async (req, res) => {
    try {
        console.log(req.body)
        const { error } = authschema.validate(req.body);
        if (error) { return res.status(400).json({ message: error.details[0].message }); }
        const exisistinUser = await User.findOne({ mail: req.body.mail });
        if (exisistinUser) { return res.status(409).json({ message: "Email already exists." }); }


        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        console.log(hashedPassword)
        const userDetail = new User({
            name: req.body.name,
            mail: req.body.mail,
            password: hashedPassword,
        });


        await userDetail.save();
        return res.status(201).send({ message: "User Registration success" });
    } catch (Err) {
        return res.status(500).send({ message: "Server error" });
    }
}

const resetreq = async (req, res) => {
    try {
        const schema = Joi.object({ mail: Joi.string().email().required() });
        const { error } = schema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const user = await User.findOne({ mail: req.body.mail });

        if (!user)
            return res.status(400).send("user with given email doesn't exist");

        let token = await Token.findOne({ userId: user._id });
        if (!token) {
            token = await new Token({
                userId: user._id,
                token: crypto.randomBytes(32).toString("hex"),
            }).save();
        }
        console.log(user._id)
        const link = `${process.env.BASE_URL}/${user._id}/${token.token}`;
        await sendEmail(user.mail, "Password reset", link);

        res.send("password reset link sent to your email account");
    } catch (error) {
        res.send("An error occured");
        console.log(error);
    }
};

const passres = async (req, res) => {
    try {

        const userData = {
            userId: req.params.userId,
            token: req.params.token,
            password: req.body.password
        }
    
        console.log(userData)    
      
        const user = await User.findById(userData.userId);
        if (!user) return res.status(400).send("User not found.");
        console.log(user)
        const tokenDoc = await Token.findOne({token:userData.token });
        if (!tokenDoc) return res.status(400).send("Invalid or expired token.");
        console.log(tokenDoc)

        const hashedPassword = await bcrypt.hash(userData.password, 10);
        user.password = hashedPassword;
        await user.save();

        await tokenDoc.deleteOne();

        return res.status(200).send("Password reset successfully.");
    } catch (error) {
        console.error(error);
        return res.status(500).send("An error occurred.");
    }
};



const signIn = async (req, res) => {
    try {
        const { mail, password } = req.body;
        const users = await User.findOne({ mail });
        function compass(password, pass) {
            return bcrypt.compareSync(password, pass)
        }
        const dehash = compass(password, users.password)
        if (dehash == false) {
            return res.status(401).json({ message: "Invalid credentials." });
        }
        const token = jwt.sign({ mail: users.mail }, "the_password");
        res.status(200).json({ message: "login successfully", token })
    } catch (error) {
        return res.status(500).send({ message: "Server Error" });
    }
}


const getall = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).send({ users })
    } catch (error) {
        return res.status(500).send({ message: "Server Error" });
    }
}



module.exports = {
    signUp,
    signIn,
    getall,
    passres,
    resetreq,

}