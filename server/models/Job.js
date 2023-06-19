

//database schema for mongoDB using mongoose library
const mongoose = require ('mongoose')


// mongoose docs provide a lot of methods for string validators like
//ex: min and max length
const JobsSchema = new mongoose.Schema({
    company:  {
        type: String,
        required: [true, ' Please provide company name'],
        maxLength: 50
    },
    position: {
        type: String,
        required: [true, ' Please provide position'],
        maxLength: 150
    },
    status:{
        type: String,
        enum: ['interview','declined','pending'],
        default: 'pending'

    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user']
    }
},{timestamps: true})


module.exports= mongoose.model('Job', JobsSchema);