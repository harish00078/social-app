// this (version-file) will be connect with the (api)folder or file:
// thourgh (route):which we have created in the (api) file:

// IMP = this (version) file  will only be (triggered):if the (user) has been (request) to  this (version) of (api):
// or we can say if it is using the (v1) version of (api):
// and these (version) files:basically further (connected) to the (different) (files) acc to the (user-request) to the (api):

// like: (posts)file:if (user-request) to the (api) for the (posts):(comments)file etc:

// and those (files) will (further) connected with there (controllers) to (gave)  the (response) to the (user):acc to its (request):

// IMP = these (controller) will also further (divided) into the (api) version sections:so that we can gave the (response) to the (user):
// acc to the (version) of (api) it is (using) :



// here we setup our (v1-api) version (routes):
const express = require('express');

const router = express.Router();



// here we connect the (v1) version (api)  router:with the (further) files:
// acc to the (user-request) to the (api):
// here we are basically connecting with the (posts) file:if (user) request to the (apI) for the (posts):
router.use('/posts',require('./posts'));


// here we create route of the (user's) api authentcation controller:
// or we say controller for the (user) authentication:and creating  (session) for it:so that it can use the (api) after it successfully logged in:
router.use('/users',require('./users'));





module.exports = router;


