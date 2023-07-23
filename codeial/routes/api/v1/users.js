// here we create router  for the (user) api-authentication controller:

const express = require('express');

const router = express.Router();

// here we have to (import) the (user_api) controller or  we can say the (session) controller that  we have created under the (user_api) file:
// so that we can gave the (session-token) to the (user):after it successfully (logged in):
const userApi = require('../../../controllers/api/v1/users_api');



// here we creating the router: for the (user)'s api-authentication:
// or we can say:for giving the (session-token) to the (user):after it successfully (logged in):
// through the (createSession) controller that we have created under the (user_api) file:
router.post('/create-session', userApi.createSession);



// we have to import the (route):
module.exports = router;

