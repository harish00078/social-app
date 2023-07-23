const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/users_controller');

router.get('/profile/:id', passport.checkAuthentication, usersController.profile);
router.post('/update/:id', passport.checkAuthentication, usersController.update);

router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);


router.post('/create', usersController.create);

// use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
), usersController.createSession);


router.get('/sign-out', usersController.destroySession);

// we have to define the (two) routes:for the (social-authentication):
// 1 =  one that will get the (user) to the (google)authentication:
// 2 = second that will get the (user) data from the (google):if (user)successfully get authenticated:
/// here we also define the (scope) In the (routes): to tell that want kind of (user) data: we want from the (google):

// here we create our (first) route:for connecting the (user) with the (google) authentication:
// this router is already given by the (passport):so that (google) can recognize:what kind of (request):we are sending to him:
// so we use (passport) to authenticate:then we have to define two things:
// 1 = strategy of the (passport) that we are trying to use: and that  is (google) strategy:that we define the (google):
// 2 = second is the (scope):under scope we define the things to the (req):that we are looking for in the (response):if the (user) get (signed in) successfully:
// here we gave two things in the (scope):
// 1 = first is (profile)data of the (user):
// 2= second is (email) of the (user):through which it try to log-in:
router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));


// here we create our second route:through which we get the (user-data) in the (response) from the (google):
// here In callback router: we have to define the two things:
// 1 = first is the (passport-authentication):
// => it will have to things as well:
// 1 = first is the (strategy) that we used to authenticate the (user):
// 2 = second is the (failure-Redirect) function:if the (user) does not successfully get (signed-in):then It will connect the (user) to the (sign-In) route again and also (automatically) signed-in the (user) with  the (website):
// because In the callback function of (google-strategy) that we have create: we aslo define the (user-create) account function:that will create the (user) account automatically:if the (user) does not successfully able to (signed-in):

// 2 = second is that:if the  (user) is signed-In:then we also have to connect it with the (create-session) controller:so that the (sign-in) user can use the (web-site): 
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/users/sign-in'}), usersController.createSession);




module.exports = router;