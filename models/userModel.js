//Import packages
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

//User document schema 
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true
    },
    lastName: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        unique: false,
        trim: true
    }
});

//Encrypt password prior the document storage
userSchema.pre('save', async function(next) {
    //Generate salt and hash password
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);

    next();
});

//Print document storage message after save action
userSchema.post('save', async function(user, next) {
    console.log(`\nUser ${user.firstName} ${user.lastName} added to the database`);

    next();
}); 

//Validate password
userSchema.statics.loginValidation = async function(existingUser, password) {
    const auth = await bcrypt.compare(password, existingUser.password);

    //Assert result 
    if(auth) {
        return true;
    }
    else {
        return false;
    }
}

//Export schema into model
module.exports = userModel = mongoose.model('users', userSchema);