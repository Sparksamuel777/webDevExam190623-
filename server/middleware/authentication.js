

const User = require('../models/User')  // importing the use schema
const jwt = require('jsonwebtoken'); //to verify if the header coming back to us bears the token
const {UnauthenticatedError} =require('../errors')

const auth = async (req,res,next) => {
    //check header

    const authHeader = req.headers.authorization  // getting the auth key in header
    if(!authHeader || !authHeader.startsWith('Bearer')){
        throw new UnauthenticatedError('Authentication invalid') //no auth header in request
    }
// authorization format = Bearer +space+token   if space is ommitted during setup or input, authorization error will kick in
    const token = authHeader.split(' ')[1]  // split the object on a space and give me the index 1 which is the jwt
    try{
        const payload = jwt.verify(token,process.env.JWT_SECRET)
        //attach the user to the job routes
        //in our auth file in controllers, we add username and user id to the token when we are creating the usertoken in registration
        /*
        Alternative option:
        const user = User.findById(pyload.id).select('-password')
        req.user = user
         */
        req.user = { userId: payload.userId, name:payload.name}  //the payload verify returns the name and userid, we are directly passing this on to the req.user


        next();  // next so we pass this on to the next route which is the jobs route
    }catch (error){
        throw new UnauthenticatedError('Authentication invalid')
    }
}


module.exports = auth  ;
