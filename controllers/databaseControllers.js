//Import packages
const mongoose = require('mongoose');

//Database connection controller method
module.exports.connectController = async () => {
    //Connect to database
    await mongoose.connect(process.env.MONGO, {
        useUnifiedTopology: true,
        useCreateIndex: true,
        useNewUrlParser: true
    })
    .then(() => {
        console.log(`\nDATABASE - Connected to database, welcome user`);
    })
    .catch((error) => {
        console.log(`\nDATABASE - ${error.message}, connection failed`);
        //Stop server process
        process.exit(1);
    });
}