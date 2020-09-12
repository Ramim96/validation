//Import packages
const router = require('express').Router();

//Import controllers
const userControllers = require('../controllers/userControllers');
const validationControllers = require('../controllers/validationControllers');

//METHOD    POST
//ROUTE     /user
//DESC      Sign-up/register route
router.post("/signup", validationControllers.signUpValidator(), validationControllers.validate, userControllers.signUpController);

//METHOD    POST
//ROUTE     /user
//DESC      Sign-ip/login route
router.post("/signin", validationControllers.signInValidator(), validationControllers.validate, userControllers.signInController);

//Export routes
module.exports = router;