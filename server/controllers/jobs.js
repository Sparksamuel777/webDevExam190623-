// controllers for the routes
const Job = require ('../models/Job')  //importing our Job model
const {StatusCodes} = require('http-status-codes')
const {BadRequestError,NotFoundError} = require('../errors')




//JOBS CRUD controller


const createJob = async (req,res) => {
    req.body.createdBy = req.user.userId  // creating a new field in req.body which we obtain from req.user
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json(job)
}


const getAllJobs = async (req,res) => {
    // we want to get all jobs associated with this user
    const jobs = await Job.find({createdBy: req.user.userId}).sort('createdAt') //filter method by mogoose
    res.status(StatusCodes.OK).json({jobs, count: jobs.length})
}

const getJob = async (req,res) => {
    // we need two things, the user id and the job id
    //the user id we can obtain in the req.user and the job id we can
    ///obtain from params object provided by express

    //let us perform a nested destructuring to obtain this data
   const { user: {userId},params:{id:jobId}} = req  //nested destructuring
   const job = await Job.findOne({
       // we need the createdBy as a filter else someone with the job
       //id can find the jobs of another user
       _id: jobId,
       createdBy: userId
   })

    if(!job){
        //if no job with the id
        throw new NotFoundError(`No job with the id ${jobId}`)
    }

    //type cast error
    //our id is generated based on certain conditions ex min length and mix of characters
    //if for ex the id length provided is less than the min length then a type cast error will be
    //thrown.


    //else if everything is okay, send the job
    res.status(StatusCodes.OK).json({job})

}



const updateJob = async (req,res) => {
    // we need two things, the user id and the job id
    //the user id we can obtain in the req.user and the job id we can
    ///obtain from params object provided by express

    // we also need data from the body because we need to udate the already exisiting data

    //let us perform a nested destructuring to obtain this data
    const { user: {userId},
        params:{id:jobId},
        body: {company,position}
    } = req  //nested destructuring
    // if company or position is blank

    if (company === '' || position === ''){
        throw new BadRequestError('Company or Position fields cannot be empty')
    }


    const job = await Job.findByIdAndUpdate(
        {    // we need the createdBy as a filter else someone with the job
        //id can find the jobs of another user
        _id: jobId,
        createdBy: userId},
        req.body,
        {
            new: true,
            runValidators:true}
    )

    if(!job){
        //if no job with the id
        throw new NotFoundError(`No job with the id ${jobId}`)
    }

    //type cast error
    //our id is generated based on certain conditions ex min length and mix of characters
    //if for ex the id length provided is less than the min length then a type cast error will be
    //thrown.


    //else if everything is okay, send the job
    res.status(StatusCodes.OK).json({job})

}


const deleteJob = async (req,res) => {
    // we need two things, the user id and the job id
    //the user id we can obtain in the req.user and the job id we can
    ///obtain from params object provided by express


    // we need to find the job first and then delete it next
    //let us perform a nested destructuring to obtain this data
    const {
        user: {userId},
        params:{id:jobId}
    }
        = req  //nested destructuring
    const job = await Job.findByIdAndRemove({
        // we need the createdBy as a filter else someone with the job
        //id can find the jobs of another user
        _id: jobId,
        createdBy: userId
    })

    if(!job){
        //if no job with the id
        throw new NotFoundError(`No job with the id ${jobId}`)
    }

    res.status(StatusCodes.OK).send();
}

module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
}