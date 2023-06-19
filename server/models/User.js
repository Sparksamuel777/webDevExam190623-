

//database schema for mongoDB using mongoose library
const mongoose = require ('mongoose')
//bcrypt hashes our passwords into a bit-string of fixed size using a mathematical algorithm
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");


// mongoose docs provide a lot of methods for string validators like
//ex: min and max length
const UserSchema = new mongoose.Schema({
    name:  {
        type: String,
        required: [true, ' Please provide name'],
        minLength: 3,
        maxLength: 50
    },
    email: {
        type: String,
        required: [true, ' Please provide email'],
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            , 'Please provide a valid email'],  //regEx for email validation
        unique: true  // it's not a validator,we want the email to be unique in our database. This method keeps an index of user emails
    },
    password:{
        type: String,
        required: [true, ' Please enter password'],
        minLength: 6
    }
})


//check mongoose doc for pre
UserSchema.pre('save',async function (){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt)

    //next();
})

/*
Mongoose provides us with some schema methods which we
can use to work with schemas

we can generate our jwt here instead of the auth so
all our logic for authentication is in one place
 */
//see mongoose docs for more details
UserSchema.methods.createJWT = function (){
    return jwt.sign
    (
        {userId: this._id, name: this.name},
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_LIFETIME}
    )
//privateKey or secret has to be processed from dotENV, but
    //we are cheating a little bit to save time
    //we can use allkeysgenerator website to generate a strong key
}

// let us compare the password , we use this mode so we dont
//jam our auth file with too much code

UserSchema.methods.comparePassword = async function (candidatePassword){
   //compares the password with what was entered as an argument vs what's saved in the database
    return await bcrypt.compare(candidatePassword, this.password);  //boolean
}

module.exports= mongoose.model('User', UserSchema)