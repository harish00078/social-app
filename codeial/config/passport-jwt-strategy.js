// here we create or use the  (possport-jwt-strategy):for (authenticating) the (API)s:

// first we import passport:
const passport = require('passport');

// second we import the (passport-jwt-strategy):
const JWTStrategy = require('passport-jwt').Strategy;

// third we import the (module) that will help us to (extract) the (jwt) from the (header):
const ExtractJWT = require('passport-jwt').ExtractJwt;

// fourth we import the (user) schema:because we are authenticating the  (user) and then gave them the (access) of the (API)s:
const User = require('../models/user');


// while defining the (jwt-strategy):we need the (options):
// and one off the (option) is (encryption):
// option => options is an object literal containing options to control how the token is extracted from the request or verified:
// we need to create the (key) that will be able to (encrypt) or (decrypt) the any (string):
// currently we are only creating the simple (key):but when we deploy our app will change them:into some (hexa)code or (#)code:

let opts = {

  // option => options is an object literal containing options to control how the token is extracted from the request or verified:

  // => first key for get the (token):
  // here we have (one) key:In options:that will get the  (jwt-token) or we can say (extract) the (jwt-token) from the (header):
  // IMP = because (header) is combination of (keys):which will have the (authentication)key and under the (authentication)key:
  // there are futher (keys):one of them will we the (BearerToken) key:and which  will  have the (jwt-token):that is created:
  // if the (uers) is (successfullly) authenticated:and here we (need) that (jwt-token):so that we can (encrypt and decrypt) them: 


  // defination =>(jwtFromRequest) (REQUIRED) Function that accepts a request as the only parameter and returns either the JWT as a string or null.
  //  for getting the (jwt) form the (request) or (header): we are using the (ExtracrJWT) module that we have imported:
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),



  // => here we have second key for (verifying) the  (token) or we can the (token) signature:
  // secretOrKey is a string or buffer containing the secret (symmetric) or PEM-encoded public key (asymmetric) for verifying the token's signature. REQUIRED unless secretOrKeyProvider is provided.
  // or we can say this is our  (encryption or decryption) secret key or (string) we can say:
  // because basically through this we will (encrypt)  or (decrypt) our (token):
  secretOrKey:'codeial'


}





// after that we have to tell the (possport) to use this (Jwt-strategy):
// and that (jwt-strategy) will have (opts) and function:which will have two arguments (jwtPayload) and (Load):


// the (jwtPayload):is basically a argument:which contain the (information) of the (user):and we will basically find the (user) or we can say check the (user) in the (database):through this (jwtPayload) arguement information that it will have in it  (related) to the (user):
// the (load):is basically a argument that will work like a (callback) fucntion:


// => passReqToCallback: If true the request will be passed to the verify callback. i.e. verify(request, jwt_payload, done_callback).
// => verify is a function with the parameters verify(jwt_payload, done)
// 1 => jwt_payload is an object literal containing the decoded JWT payload.
// 2 => done is a passport error first callback accepting arguments done(error, user, info)
passport.use(new JWTStrategy(opts, function(jwtPayLoad, done){


  // here we are finding the (user) in the (database):through the (information) of the (user):that will be present in the (jwtPayLoad) argument:
  // we are finding the (user) through the (ID):because (id) is the (unique-key) in the (database) for (every-object) that is present in the (database):
  User.findById(jwtPayLoad._id ,function(err,user){
    // if we have (error):for finding the user:
    if(err){
      console.log('error in finding user from jwt');
      return;
    }

    // if we have found the user:
    if(user){

      // then we return the (done):and also the (user):to tell the (jwt-strategy) function:that we have found the user: 
      return done(null,user);


    }else{


      // and else we return the (done): with the (false):to tell the (jwt-strategy) function:that we  have not found the user:
      return done(null,false);

    }


  })

}));


// and after that we have to import this (passport-jwt-strategy):
module.exports = passport; 