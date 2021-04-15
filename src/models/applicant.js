const moongose = require('mongoose');
const applicantSchema = moongose.Schema({
    _id : moongose.Types.ObjectId,        
    recruiter_id :  moongose.Types.ObjectId,
    job_id :  moongose.Types.ObjectId,
    candidate_id :  moongose.Types.ObjectId,  
    candidateName : String,
    candidateEmail : String, 
    createdDate : {type : Date,default : Date.now},


})
module.exports = moongose.model('applicant',applicantSchema);