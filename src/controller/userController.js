const user = require( "../models/user" );
const mongoose = require( "mongoose" );
const bcrypt = require( 'bcrypt' );
const jwt = require( 'jsonwebtoken' );

exports.login = ( req, res, next ) => {
    const { userName, password } = req.body;
    user.find( { userName: userName }, ( err, result ) => {
        if ( err ) {
            return res.status( 500 ).json( {
                "status": false,
                "message": "Invalid User"
            } )
        } else {
            if ( result.length > 0 ) {
                bcrypt.hash( req.body.password, 10, ( err, hash ) => {
                    if ( err ) {
                        return res.status( 500 ).json( {
                            "status": false,
                            "message": "Internal Server Error"
                        } )
                    }
                    bcrypt.compare( password, result[0].password, ( err, isAuthentic ) => {
                        if ( isAuthentic ) {
                            const token = jwt.sign( {
                                userName: result[0].userName,
                                _id: result[0]._id,
                                role: result[0].role
                            }, "SquareBoat", {
                                expiresIn: "1h"
                            } );
                            result[0].token = token;
                            res.status( 200 ).json( {
                                "status": true,
                                "message": "Login Successfully",
                                "token": token
                            } )
                        } else {
                            return res.status( 401 ).json( {
                                "status": false,
                                "message": "Authentication Failed",
                                "data": ""
                            } )
                        }
                    } )
                } );
            } else {
                return res.status( 500 ).json( {
                    "status": false,
                    "message": "User Not Available Please Register first",
                    "data": ""
                } )
            }
        }
    } )

}
exports.createUser = ( req, res, next ) => {
    user.find( { userName: req.body.userName }, ( err, docs ) => {
        if ( err ) {
            return res.status( 500 ).json( {
                "status": false,
                "message": "Internal Server Error"
            } )
        } else {
            if ( docs.length > 0 ) {
                return res.status( 419 ).json( {
                    "status": false,
                    "message": "UserName Already Exist"
                } )
            } else {
                bcrypt.hash( req.body.password, 10, ( err, result ) => {
                    if ( err ) {
                        res.status( 500 ).json( {
                            "message": "Internal Server Error"
                        } )
                    } else {
                        const customer = new user( {
                            _id: mongoose.Types.ObjectId(),
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            password: result,
                            phoneNo: req.body.phoneNo,
                            email: req.body.emailId,
                            userName: req.body.userName,
                            role: req.body.role
                        } );
                        customer
                            .save()
                            .then( ( result ) => {
                                res.status( 201 ).json( {
                                    status: true,
                                    message: "User Register Successfully",
                                } );
                            } )
                            .catch();
                    }
                } );
            }
        }
    } );
};
