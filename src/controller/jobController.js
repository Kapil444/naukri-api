const job = require( "../models/job" );
const mongoose = require( "mongoose" );

exports.createJob = ( req, res, next ) => {

    const jobDetail = new job( {
        _id: mongoose.Types.ObjectId(),
        title: req.body.jobTitle,
        description: req.body.LastName,
        location: req.body.jobLocation,
        companyName: req.body.companyName,
        description: req.body.description,
        recruiter_id: req.body.recruiter_id,
        recruiter_name: req.body.employerName,
        recruiter_userName: req.body.supportEmail,
        monthlySalaryMin: req.body.monthlySalaryMin,
        monthlnSalaryMax: req.body.monthlnSalaryMax
    } );
    jobDetail
        .save()
        .then( ( result ) => {
            res.status( 201 ).json( {
                status: true,
                message: "Job Posted Successfully",
                data: jobDetail
            } );
        } )
        .catch();

};
exports.getAllJobs = ( req, res, next ) => {
    job.find({}, null, {sort: {createdDate: -1}}, ( err, doc ) => {
        if ( err ) {
            return res.status( 500 ).json( {
                "status": false,
                "message": "Server Error"
            } )
        } else {
            return res.status( 200 ).json( {
                "status": true,
                "message": "Successfully Retrive",
                "data": doc
            } )
        }
    } )
}
exports.getById = ( req, res, next ) => {
    job.findById({_id : req.params.jobId}, ( err, doc ) => {
        if ( err ) {
            return res.status( 500 ).json( {
                "status": false,
                "message": "Server Error"
            } )
        } else {
            return res.status( 200 ).json( {
                "status": true,
                "message": "Successfully Retrive",
                "data": doc
            } )
        }
    } )
}
exports.getJobsByRecruiter = ( req, res, next ) => {
    job.find( { recruiter_id: req.params.recId }, null, {sort: {createdDate: -1}}, ( err, docs ) => {
        if ( err ) {
            return res.status( 500 ).json( {
                "status": false,
                "message": "Server Error"
            } )
        } else {
            return res.status( 200 ).json( {
                "status": true,
                "message": "Successfully Retrive",
                "data": docs
            } )
        }
    } )
}