const express = require('express');

const router = express.Router();

const passport = require('passport');

// here we store (posts) (api-request) controller route in the (variable):
// so that we can check the (api) or  gave him the  (right) controller:
// acc to the (api) request that we are getting from the (user):
const postsApi = require('../../../controllers/api/v1/posts_api');


// here we gave controller to this (api-request):
router.get('/', postsApi.index);

// here we create (delete) post (route) through the (api):
// so for (authenticating) the (delete) post route of the  (api) or we can say through (api):
// we have to use the (passport.authenticate) function:
// and under that function we have to provide the two things:to authenticate the (route):
// first  = is the (strategy) of the (passport):
// second = is the (session) and put it into the (false) state:because we did not want to generate the (session-cookies) on the (user) authentication:

router.delete('/:id',passport.authenticate('jwt',{session:false}) ,postsApi.destroy);





module.exports = router;
