// here we create the strategy of the (passport-google-oauth2.0):
// so that we can authenticate our (web-app) with the help of (socail-authentication):
// and here we are using the (google) for (socail-authentication):

// first we have  to import the (passport):
const passport = require("passport");

// second we have to import the (passport-google-oauth):
// and also have to tell that which kind of strategy:
// we are using of the (passport-google-oauth):
// so here we are using its (oauth2.0) strategy:
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;

// third we have to import the (crypto) library:that will help us to generate the (random) or (unique) passwords:
const crypto = require("crypto");

// fourth we have to import the (User):because we are using the (social-authentication) on the (user):
const User = require("../models/user");

// after that we have to tell the (passport) to use the (google-oauth) strategy:that we have created:or we can say use the object of (google-oauth) strategy:
passport.use(
  new googleStrategy(
    {
      // In google strategy:first we gave the (CLientID) to the (passport):
      clientID:
        "289203943405-pbn6uhs3a6d7ab3f0bsq6ftm8k77vomd.apps.googleusercontent.com",
      // second we have to provide the (clientSecret):
      clientSecret: "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",

      // third we have to provide the (callbackURL):
      callbackURL: "http://localhost:8000/users/auth/google/callback",

      // here we create the (callback) function:
      // which will get all the (data) of the (user) from the (google):In the form of (accessToken):
      // if it sucessfully able to (authenticate):
      // and that data will go to the (server):so we can also check that  (user) on (our-app's) database:

      // IMP = this callback function:will have four things:
      // 1 = first is the (accessToken) it self:(accessToken) is also used for the other so many things:
      // 2 = second is the (refreshToken) it self:it used to get the new (accessToken):if the older-one get expired:
      // 3= third is the (profile) argument:which will have the information of the (user) profile:
      // 4 = fourth is the (done) argument:which will complete this function:
    },

    function (accessToken, refreshToken,profile,done) {

      //so here we are checking the (user): In our (own-app's) database:
      // so (user) will have multiple accounts on the (google):or it means it has multiple (emails) of the (account):
      // but we only had to get the (email):through which he try to login on my webstie:
      // for that we can use its (profile-email) value:because when user (authenticate) on my website:through (google):
      // google will also gave me its (profile) data:through which he try to login on my webstie:
      User.findOne({email: profile.emails[0].value}).exec(function(err,user){

        // if we have error: while finding (user):
        if(err){

          console.log('error in google strategy-passport',err);
          return;

        }
        // here we are also printing the (access token) or (refresh token):

        console.log(accessToken,refreshToken);

        // here we  are printing the (profile) data on the (console):
        // so we can see that:what is (profile):
        console.log(profile);



        // but if we found the (user):
        if(user){
          
          // then we have to return the (user):
          // and also complete this (function):
          return done(null,user);

          // but if we did not have the (user):
        }else{

          // then we have to create the (user):
          // this callback function will work with both the (ways):
          // for sign-in the (user) or (sign-up) user as well:
          // IMP = like we are try to (log-in) through (google):
          // IMP = we can also (sign-up) or (create) the (user) account through (google):

          // so here we are creating the (user):also set it as (req.user):means (sign-in) that (user):that we have created:
          // we can create the (user):with the (profile) arguement:
          // because it will have all the (data):that user (use) to login on the (website) through (google):

          User.create({

            // for name key:we will use the (name) of the (profile):or we can say the (name):that will be  in the (profile):
            name:profile.displayName,

            // for email key:we will use the (email) of the (profile):or we can say the (email):through which (user) try to login on my(website) with the help of  (google):
            email:profile.emails[0].value,

            // for password key:we will use the (crypto) library to (generate) the (random) or (unique) password:
            // To using (crypto):we have to define the (two) things:
            // 1 = first is (randomBytes):Generates cryptographically strong pseudorandom data. The size argument is a number indicating the number of bytes to generate.
            // 2 = second is (toString):which is used to tell the type of the (password) should be generated:
            password:crypto.randomBytes(20).toString("hex"),

          

            // another callback function:if there is an (error):while creating a (new-user) account:
          },function(err,user){

            // if we have error: while creating (user):
            if(err){

              console.log('error in creating user through google passport-strategy',err);
              return;
    
            }

            // if we successfully created the account of the new user:
            // then we have to return the (user):and complete this function:
            return done(null,user);



            

          });
      

        }

      });

    }
  )


);




// after all that we have to export this (strategy):
module.exports = passport;