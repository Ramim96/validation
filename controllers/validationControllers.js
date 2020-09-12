//Import packages
const {body, validationResult} = require('express-validator');

//Sign-up/register validation/sanitization controller
module.exports.signUpValidator = () => {
    return [
        body('firstName').isLength({min: 2}).trim().escape(),
        body('lastName').isLength({min: 2}).trim().escape(),
        body('email').isEmail(),
        body('password').isLength(5).trim()
    ];
}

//Sign-in/login validation/sanitization controller
module.exports.signInValidator = () => {
    return [
        body('email').isEmail(),
        body('password').isLength(5).trim()
    ];
}

//Validation error controller
module.exports.validate = (req, res, next) => {
    const errors = validationResult(req);
    const errorObj = {};

    //Assert validation errros
    if(errors.isEmpty()) {
        return next();
    }
    else {
        //Update the errors object by mapping the validation result
        errors.errors.map(error => {
            errorObj[error.param] = error.msg;
        });
        
        //Return validation errors
        return res.status(422).send({
            msg: "Validation errors",
            success: false,
            errors: errorObj
        });
    }
}