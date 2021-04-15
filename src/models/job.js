const moongose = require('mongoose');
const jobSchema = moongose.Schema({
    _id : moongose.Types.ObjectId,
    title : String,
    description : String,
    location : String,
    experienceRequired : String,
    companyName : String, 
    recruiter_id : {type : String,required:true},
    recruiter_name : String,
    recruiter_userName : String,
    monthlySalaryMin:String,
    monthlnSalaryMax:String,
    createdDate : {type : Date,default : Date.now},


})
module.exports = moongose.model('job',jobSchema);