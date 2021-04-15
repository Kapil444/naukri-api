const moongose = require('mongoose');
const userSchema = moongose.Schema({
    _id : moongose.Types.ObjectId,
    firstName : String,
    lastName : String,
    password : String,
    phoneNo : {type:String},
    email : {type:String,required:true},
    createdDate : {type : Date,default : Date.now},
    userName : {
        type : String,
        required : true,
        unique : true
    },
 role : {type : String}

})
module.exports = moongose.model('user',userSchema);