const express = require( 'express' );
const app = express();
const usersRoute = require( './src/routers/userRouter' )
const jobRoute = require( './src/routers/jobRouter' )
const applicantRoute = require( './src/routers/applicantRouter' )
const mongoose = require( 'mongoose' );
const bodyParser = require( 'body-parser' );
const morgan = require( 'morgan' );
var cors = require('cors')
const uri = "mongodb+srv://admin:1234567890@cluster0.s11is.mongodb.net/nokri?retryWrites=true&w=majority";
const jwt = require( 'jsonwebtoken' );
const port = process.env.PORT || 5000;
app.use( morgan( 'dev' ) );

//server Run on port 5000
app.listen( port, ( err ) => {
  if ( err ) { console.error( err ); }
  console.log( 'Listening on 5000' );
} );
app.use(cors())
// Use connect method to connect to the server
mongoose.connect( uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}, function ( err, client ) {
  if ( err ) {
    console.log( err );
  } else {
    console.log( "Connected successfully to Database" );
  }

} );

//  parse application/x-www-form-urlencoded
app.use( bodyParser.urlencoded( { extended: false } ) )
app.use( bodyParser.json() )

app.use( '/api/v1/user', usersRoute );
app.use( '/api/v1/job', jobRoute );
app.use( '/api/v1/applicant', applicantRoute);

app.get( ( req, res, next ) => {
  return res.status( 404 ).json( {
    "message": "Url Not Found "
  } )
} )

module.exports = app;
