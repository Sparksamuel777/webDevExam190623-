// controllers for the routes
//we import our model and here we shall authenticate our users that
//want to login or validate those that want to register
const User = require('../models/User')  // named import
const {StatusCodes} = require ('http-status-codes')  //we are importing status codes
const {BadRequestError,unauthenticated, UnauthenticatedError} = require('../errors')  // importing our custom error
// we do not want to store passwords in our database as strings as if our database is compromised
//passwords can be stolen as usually people use one password for most things
/* DEPRECATED
//bcrypt hashes our passwords into a bit-string of fixed size using a mathematical algorithm
const bcrypt = require('bcryptjs')

*/
const jwt = require('jsonwebtoken')
const register = async (req,res) => {
   //let us manually check that the user has input name and password before proceeding
    // if we removed this code, mongoose validator will be used by default whihc does almost the same thing
/*

DEPRECATED, WE REPLACED THIS IN THE USER FILE WHERE WE CAN GET ACCESS TO PASSWORD
WITHOUT NEEDING TO CODE HERE AND WE USED THE INBUILT MONGOOSE PRE-MIDDLEWARE

const {name,email,password} = req.body //named import

    if (!name || !email || !password){
        throw new BadRequestError(' Please provide name, email and password')
    }//we are creating a temporary user so we can save user data and hash password
    const salt = await bcrypt.genSalt(10); //how many rounds of random bits should be added
    const hashedPassword = await bcrypt.hash(password,salt)
    const tempUser = {name,email,password:hashedPassword}  //destructuring
 */
    const user = await User.create({...req.body}) // "..." is to spread over the  object and get all its properties, then overwrite the existing properties with the ones we're passing

    const token = user.createJWT();
    //after user has been created, we can then generate our token and send it back
  /* deprecated see User in models, we are using Schema methods to create the
  jwt so our logic is one place
   const token = jwt.sign
    (
        {userId: user._id, name: user.name},
        'jwtSecret',
        {expiresIn: '30d'}
    )
   */

    res.status(StatusCodes.CREATED).json({user: {name: user.name},token })   // register the user and send back token so frontend can use to access the member only resource
}
const login = async (req,res) => {
      // Log-in the user: we need to check if the user exists
    //if they do then we can proceed else we send back the unauthenticated error
    const {email,password} = req.body
    if (!email || !password){
        //if they do not input email or password
        throw new BadRequestError('Please provide email and  password')
    }
    //save the user credentials in our variable
    const user = await User.findOne({email}) //find user using email or username
    // compare to see if user exists in DB
    if(!user){
        throw new UnauthenticatedError('Invalid Email')
    }
    // compare if password match

    const isPasswordCorrect = await user.comparePassword(password)

    if(!isPasswordCorrect){
        //if passwords don't match
        throw new UnauthenticatedError('Invalid Password')

    }
    const token = user.createJWT();
    res.status(StatusCodes.OK).json({user: {name: user.name, id: user.id },token })
}

module.exports = {
    register,login
}