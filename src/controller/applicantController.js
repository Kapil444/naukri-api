const applicant = require( "../models/applicant" );
const user = require("../models/user")
const mongoose = require( "mongoose" );

exports.postApplicant = ( req, res, next ) => {
    user.findById({_id : req.body.candidate_id},(err,user)=>{
        if(err){
            res.status( 500 ).json( {
                status: false,
                message: "Server Error"           
            } );  
        }else{
            const applicantInfo = new applicant( {
                _id: mongoose.Types.ObjectId(),
                recruiter_id: req.body.recruiter_id,
                job_id: req.body.job_id,
                candidate_id: req.body.candidate_id,
                candidateName : user.firstName + user.lastName,
                candidateEmail : user.email,
            } );
            applicantInfo
                .save()
                .then( ( result ) => {
                    res.status( 201 ).json( {
                        status: true,
                        message: "Successfully Applied",
                        data: applicantInfo
                    } );
                } )
                .catch();
        }
    })
    

};
exports.getByJobId = ( req, res, next ) => {
   applicant.find({job_id : req.params.jobId}, null, {sort: {createdDate: -1}},(err,docs)=>{
       if(err){
        res.status( 500 ).json( {
            status: false,
            message: "Server Error"           
        } ); 
       }else{
        res.status( 200 ).json( {
            status: true,
            message: "Successfully Retrive",
            data : docs           
        } );   
       }
   })
};
exports.getByJobIdAndCandidateId = ( req, res, next ) => {
    applicant.find({job_id : req.params.jobId,candidate_id : req.params.candidateId}, null, {sort: {createdDate: -1}},(err,docs)=>{
        if(err){
         res.status( 500 ).json( {
             status: false,
             message: "Server Error"           
         } ); 
        }else{
         res.status( 200 ).json( {
             status: true,
             message: "Successfully Retrive",
             data : docs           
         } );   
        }
    })
 };
 
exports.getByCandidateId = (req,res,next)=>{
    applicant.find({candidate_id : req.params.candidateId}, null, {sort: {createdDate: -1}},(err,docs)=>{
        if(err){
            res.status( 500 ).json( {
                status: false,
                message: "Server Error"           
            } ); 
        }else{
            res.status( 200 ).json( {
                status: true,
                message: "Successfully Retrive",
                data : docs           
            } );   
        }
    })
}
