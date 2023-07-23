// here we basically create authentication (controller) for the  (user) before its using the (api):
// we are authenticating the (user) for (api)s with the  help of (JWT):

// for setting authentication  of the (user): we have to (import) the (user):
const User = require("../../../models/user");

// and we also have to (Import) the (jsonwebtoken) library:
// so that we can (return) the (jsonwebtoken) to the (browser):
// to  creating a (session) for (user):who is successfully able to login or we can authenticated through the (jwt):
const jwt = require("jsonwebtoken");

// sign in and create a session for the user:
module.exports.createSession = async function (req, res) {

  try {
    // first we have to found the (user):for that we can use the (findOne) function:
    // so that we can create the  session for that (user):
    let user = await User.findOne({
      // we are  finding the (user) with the help of (email):because here we only have to found the (one)user:
      email: req.body.email,
    });

    // if we not found the (user) with the help of (email):
    // and also if the user (password) does not match with the (password):
    // that we are getting from the (req.body):

    if(!user || user.password != req.body.password ){

      // then we have to return the (error) to the (browser) or the (user) in the (json) format:
      // (422) is basically the (invalid-Input) status code:
      return res.json(422,{

        message: "invalid username or password",

      });


    }

    // if we have found the (user):
    // then we have to create the(session):
    return res.json(200,{

      message: "sign  in successfully, here is token, please keep it safe",

      // and here we gave (token) to the (user) in the (response):with the help of (data) key:

      data:{

        // data will have there things:
        // 1 = (user): the  token will have the (user) data in the form of (json):
        // 2 = (encryption)key: and also the (encryption) key that we will use to (decrypt) the (token):
        // 3 = (expire)time of token: and also the (expire) time of the (token): 

        // and we are converting this data into the (form) of (jsonwebtoken):
        // with the help of (jsonwebtoken) library:that we have (imported) and (stored) in the  (jwt) variable:


        // IMP = this library basically convert the session (token) in the (ecryption):
        // and we can (decrypt) it with the help of (passport-jwt) library or strategy we can say:
        // so that we can use that token for the (authentication) or (autharization):
        // for the other things:those were use by  the (user):


        token: jwt.sign(user.toJSON(),'codeial',{expiresIn:'100000'})

      }
    });


  } catch (err) {

    console.log('********',err);
    return res.json(500, {


      message: "internal server error",


    });

  }

};
