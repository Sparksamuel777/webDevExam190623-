
// import controllers to direct and control routes


const express = require('express');

const router = express.Router();
const {login,register} = require('../controllers/auth')


//set up router
router.post('/register',register)
router.post('/login',login)


module.exports = router;
