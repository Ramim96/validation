//Import controllers
const generateToken = require('./jwt');

//Import models
const userModel = require('../models/userModel');

//User sign-un/register controller
module.exports.signUpController = async (req, res) => {
    try {
        //Fetch data from request-body
        const {firstName, lastName, email, password} = req.body;

        //New user document
        const newUser = new userModel({
            firstName,
            lastName,
            email,
            password
        });

        //Assert user document instance in the database
        const existingUser = await userModel.findOne({email: email});

        //Assert result 
        if(existingUser) {
            return res.status(400).send({
                field: "email",
                msg: "E-mail already taken",
                success: false
            });
        }

        //Save new document 
        await newUser.save();
        
        return res.status(201).send({
            msg: "User registered",
            success: true
        });
    } 
    catch(error) {
        //Return process error message
        return res.status(500).send({
            msg: "SERVER ERROR - Failed the process",
            success: false,
            error: error.message
        })
    }
}

//User sign-in/login controller
module.exports.signInController = async (req, res) => {
    try {
        //Fetch data from request-body
        const {email, password} = req.body;

        //Assert user document instance in the database
        const existingUser = await userModel.findOne({email: email});

        //Assert result 
        if(existingUser === null || existingUser === undefined) {
            return res.status(404).send({
                field: "email",
                msg: "User not found",
                success: false
            });
        }

        //Assert user password
        const authenticatedUser = await userModel.loginValidation(existingUser, password);
        
        //Assert result 
        if(authenticatedUser) {
            //Generate jwt token
            const token = generateToken(existingUser._id);

            return res.status(200).send({
                msg: "User logged",
                success: true,
                token
            });
        }
        else {
            return res.status(400).send({
                field: "password",
                msg: "Invalid password",
                success: false
            });
        }
    } 
    catch(error) {
        //Return process error message
        return res.status(500).send({
            msg: "SERVER ERROR - Failed the process",
            success: false,
            error: error.message
        });
    }
}