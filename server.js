//Import packages
const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');

//Import controllers
const databaseControllers = require('./controllers/databaseControllers');

//Import routes
const userRoutes = require('./routes/userRoutes');

//Configure dotenv enviroment data access
dotenv.config({path: './config/.env'});

//Express instance (server object)
const server = express();

//Middlewares
//Built-in middlewares
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({extended: true}));

//Deploy server
server.listen(process.env.PORT, () => {
    console.log(`\nSERVER - Active and listening to PORT ${process.env.PORT}`)
});

//Connect to database
databaseControllers.connectController();

//Link URI to routes
server.use("/user", userRoutes);